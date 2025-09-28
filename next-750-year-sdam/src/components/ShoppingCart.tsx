"use client"
import { ShoppingCartContext, ShoppingCartDispatchContext } from "@/contexts/ShoppingCartContext"
import React, { use, useContext, useEffect } from "react"
import { FormBuilder } from "./FormBuilder"
import { MolliePaymentMethodList } from "@/services/MolliePaymentService"
import { ApiError, ApiResult, OkResult } from "@/types/StrapiData"

interface ShoppingCartState {
    checkout: 'idle' | 'form' | 'processing' | 'success'
    paymentMethods: ApiResult<MolliePaymentMethodList> | 'unloaded'
    formState: CheckoutFormState
}

interface CheckoutFormState {
    name: string
    surname: string
    email: string
    phone?: string
    country: string
    address: string
    city: string
    postalcode: string
    payment_method: string
}

const defaultCheckoutFormState: CheckoutFormState = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    country: 'NL',
    address: '',
    city: '',
    postalcode: '',
    payment_method: ''
}

const getMolliePaymentMethodsProxy = (): Promise<ApiResult<MolliePaymentMethodList>> => fetch('/api/getPaymentMethods')
    .then(res => {
        if (!res.ok) return ApiError('Failed to fetch payment methods')
        return res.json()
    })
    .then(data => OkResult(data as MolliePaymentMethodList))
    .catch(() => ApiError('Failed to fetch payment methods'))

export const ShoppingCart: React.FC = () => {
    const context = useContext(ShoppingCartContext)
    const dispatch = useContext(ShoppingCartDispatchContext)

    const products = context.products

    const toggleSideBar = () => dispatch(['sidebar', context.sidebar == 'open' ? 'closed' : 'open'])

    const [state, setState] = React.useState<ShoppingCartState>({ checkout: 'idle', paymentMethods: 'unloaded', formState: defaultCheckoutFormState })

    useEffect(() => {
        if (context.sidebar == 'closed') {
            setState(s => ({ ...s, checkout: 'idle' }))
        }
    }, [context.sidebar])

    useEffect(() => {
        if (state.paymentMethods === 'unloaded') {
            getMolliePaymentMethodsProxy().then(r => setState(s => ({ ...s, paymentMethods: r })))
        }
    }, [state.paymentMethods])


    let _paymentMethods: ApiResult<MolliePaymentMethodList> = ApiError('Unloaded')
    if (state.paymentMethods !== 'unloaded') {
        _paymentMethods = state.paymentMethods
    }

    return <div
        className={`fixed top-0 left-0 h-full w-96 bg-white shadow-lg z-50 flex flex-col transition-transform duration-300 ${context.sidebar === 'open' ? 'translate-x-0' : '-translate-x-full'}`}
    >
        <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold">Shopping Cart</h2>
            <button className="text-gray-500 hover:text-gray-700" aria-label="Close cart" onClick={toggleSideBar}>
                &times;
            </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Example product item */}

            {context.storage.size === 0 && <div className="text-center text-gray-500">Your cart is empty</div>}

            {
                products && Array.from(context.storage.values()).map(cartItem => {
                    const product = products.data.find(p => p.id === cartItem.productId)!
                    const variant = product.variants.find(v => v.id === cartItem.variantId)!
                    return <div key={cartItem.internalId} className="flex items-center justify-between gap-2 border-b pb-2">
                        <div>
                            <div className="font-semibold">{product.title}</div>
                            <div className="text-sm text-gray-500">Size: {variant.title}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="w-12 border rounded px-2 py-1 text-center"
                                type="number"
                                min={1}
                                value={cartItem.quantity}
                                onChange={e => {
                                    const quantity = Math.max(1, parseInt(e.target.value) || 1)
                                    const updatedProduct = { ...cartItem, quantity }
                                    dispatch(['storage', context.storage.set(cartItem.variantId.toString(), updatedProduct)])
                                }}
                            />
                            <div className="text-sm">x €{(variant.price / 100).toFixed(2)}</div>
                            <div className="font-bold ml-2">€{(variant.price * cartItem.quantity / 100).toFixed(2)}</div>
                        </div>
                        <button
                            className="ml-2 text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded border border-red-200"
                            aria-label="Remove item"
                            onClick={() => {
                                context.storage.delete(cartItem.variantId.toString())
                                if (context.storage.size === 0) {
                                    setState(s => ({ ...s, checkout: 'idle' }))
                                }
                                dispatch(['storage', context.storage])
                            }}
                        >
                            X
                        </button>
                    </div>
                })
            }

            {state.checkout == 'form' && <FormBuilder<CheckoutFormState>
                defaultObject={state.formState}
                fields={[
                    { name: 'name', label: 'First Name', kind: 'text', weight: 1, required: true },
                    { name: 'surname', label: 'Last Name', kind: 'text', weight: 2, required: true },
                    { name: 'email', label: 'Email', kind: 'email', weight: 3, required: true },
                    { name: 'phone', label: 'Phone', kind: 'text', weight: 4, required: false },
                    { name: 'country', label: 'Country', kind: 'dropdown', weight: 5, required: true, options: [{ name: 'NL', value: 'NL' }, { name: 'BE', value: 'BE' }] },
                    { name: 'address', label: 'Address', kind: 'text', weight: 4, required: true },
                    { name: 'city', label: 'City', kind: 'text', weight: 5, required: true },
                    { name: 'postalcode', label: 'Postal Code', kind: 'text', weight: 6, required: true },
                    {
                        name: 'payment_method',
                        label: 'Payment Method',
                        kind: 'dropdown',
                        weight: 7, required: true,
                        options: _paymentMethods.kind === 'ok' ? _paymentMethods.data._embedded.methods.map(m => ({ name: m.description, value: m.id })) : []
                    }
                ]}
                handleChange={(key, value) => setState(s => ({ ...s, formState: { ...s.formState, [key]: value } }))}
                handleSubmit={() => { 
                    
                }}
                submitText="Pay now"
            />}
        </div>
        <div className="p-4 border-t">
            {products && <div className="flex justify-between font-semibold mb-4">
                <span>Total</span>
                <span>€{(Array.from(context.storage.values()).reduce((acc, item) => {
                    const product = products.data.find(p => p.id === item.productId)!
                    const variant = product.variants.find(v => v.id === item.variantId)!
                    return acc + (variant.price * item.quantity / 100)
                }, 0)).toFixed(2)}</span>
            </div>}

            {state.checkout == 'idle' && <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={context.storage.size === 0}
                onClick={() => setState(s => ({ ...s, checkout: 'form' }))}
            >
                Order Now
            </button>}
        </div>
    </div>
}
