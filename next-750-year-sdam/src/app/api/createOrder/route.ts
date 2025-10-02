import { CheckoutFormState } from "@/components/ShoppingCart"
import { ShoppingCartStorage } from "@/contexts/ShoppingCartContext"
import { createMolliePayment, Locale, MollieOrderLine, PaymentMethod } from "@/services/MolliePaymentService"


export async function POST(request: Request): Promise<Response> {
  const body = await request.json()

  console.log('Create order called', body)
  console.log('Create order called', body.cart)
  console.log(typeof(body.cart))

  // read body
  const formState: CheckoutFormState = body.formState
  const cart: ShoppingCartStorage = new Map(body.cart)

  // Create payment request from Mollie and pass product details to metadata
  const response = await createMolliePayment({
    amount: {
      value: cart.entries().reduce((acc, [, product]) => acc + product.pricePerUnit / 100 * product.quantity, 0).toFixed(2).toString(),
      currency: 'EUR'
    },
    description: `Order for ${formState.name} ${formState.surname}`,
    redirectUrl: `${body.origin}/${body.redirectUrl}`,
    cancelUrl: `${body.origin}/${body.cancelUrl}`,
    webhookUrl: `${body.origin}/api/webhooks/mollie`,
    metadata: {
      cart: Array.from(cart.entries())
    },
    method: formState.payment_method as PaymentMethod,
    lines: cart.entries().map<MollieOrderLine>(([, product]) => ({
      type: 'physical',
      description: product.label + ' - ' + product.variantLabel,
      quantity: product.quantity,
      unitPrice: {
        currency: 'EUR',
        value: (product.pricePerUnit / 100).toFixed(2).toString()
      },
      totalAmount: {
        currency: 'EUR',
        value: (product.pricePerUnit / 100 * product.quantity).toFixed(2).toString()
      },
      vatRate: '21.00',
      vatAmount: {
        currency: 'EUR',
        value: ((product.pricePerUnit / 100 * product.quantity) * (21 / 121)).toFixed(2).toString()
      },
      sku: product.sku.toString(),
      productUrl: `${body.origin}/products/${product.productId}`,
    })).toArray(),
    locale: formState.country == 'NL' ? 'nl_NL' : 'nl_BE' as Locale,
    billingAddress: {
      streetAndNumber: formState.address,
      city: formState.city,
      postalCode: formState.postalcode,
      country: formState.country,
      givenName: formState.name,
      familyName: formState.surname,
      email: formState.email,
      phone: formState.phone || ''
    },
    shippingAddress: {
      streetAndNumber: formState.address,
      city: formState.city,
      postalCode: formState.postalcode,
      country: formState.country,
      givenName: formState.name,
      familyName: formState.surname,
      email: formState.email,
      phone: formState.phone || ''
    }
  })

  if (response.kind === 'error') {
    console.error('Failed to create Mollie payment', response)
    return new Response('Failed to create Mollie payment ', { status: 500 })
  }
  // Return payment link
  return Response.json(response.data)
}