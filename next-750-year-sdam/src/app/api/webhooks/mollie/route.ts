import { sendEmail } from "@/sendMail";
import { getMolliePayment } from "@/services/MolliePaymentService";

export async function POST(request: Request) {
    const formData = await request.formData()
    const id = formData.get('id')
    if (!id) return new Response('Missing id', { status: 400 })

    const payment = await getMolliePayment(id.toString())

    if (payment.kind === 'error') return new Response(payment.error, { status: 500 })

    if (payment.data.status === 'paid') {

        const emailText = `Beste ${payment.data.billingAddress?.givenName},
        
        Hartelijk dank voor uw bestelling bij Ode aan Schiedam! We hebben uw betaling ontvangen en zijn bezig met de verwerking van uw order.
        Hieronder vindt u een overzicht van uw bestelling:

        ${payment.data.lines.map(line => `- ${line.quantity} x ${line.description} à ${line.unitPrice.value} ${line.unitPrice.currency} (Sub-Totaal: ${line.totalAmount.value} ${line.totalAmount.currency})`).join('\n')}

        Totaal Bedrag: ${payment.data.amount.value} ${payment.data.amount.currency}

        Verzonden naar:
        ${payment.data.shippingAddress?.streetAndNumber}
        ${payment.data.shippingAddress?.postalCode} ${payment.data.shippingAddress?.city}
        ${payment.data.shippingAddress?.country}   
        We streven ernaar uw bestelling zo snel mogelijk te verwerken en te verzenden. U ontvangt een bevestiging per e-mail zodra uw order is verzonden.
        
        Uw contactgegevens:
        Naam: ${payment.data.billingAddress?.givenName} ${payment.data.billingAddress?.familyName}
        E-mail: ${payment.data.billingAddress?.email}
        Telefoon: ${payment.data.billingAddress?.phone || 'Niet opgegeven'}

        Nogmaals bedankt voor uw vertrouwen in Ode aan Schiedam. We hopen dat u tevreden zult zijn met uw aankoop!

        Met vriendelijke groet,

        Het team van Ode aan Schiedam
        `

        const emailHtml = `
            <div style="font-family: Arial, sans-serif; color: #222;">
                <h2 style="color: #2c3e50;">Bedankt voor uw bestelling bij Ode aan Schiedam!</h2>
                <p>Beste ${payment.data.billingAddress?.givenName},</p>
                <p>
                    Hartelijk dank voor uw bestelling bij Ode aan Schiedam! We hebben uw betaling ontvangen en zijn bezig met de verwerking van uw order.
                </p>
                <h3 style="color: #2c3e50;">Overzicht van uw bestelling:</h3>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd; padding: 8px; background: #f7f7f7;">Aantal</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background: #f7f7f7;">Omschrijving</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background: #f7f7f7;">Prijs per stuk</th>
                            <th style="border: 1px solid #ddd; padding: 8px; background: #f7f7f7;">Sub-Totaal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${payment.data.lines.map(line => `
                            <tr>
                                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${line.quantity}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${line.description}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${line.unitPrice.value} ${line.unitPrice.currency}</td>
                                <td style="border: 1px solid #ddd; padding: 8px;">${line.totalAmount.value} ${line.totalAmount.currency}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <p><strong>Totaal bedrag:</strong> ${payment.data.amount.value} ${payment.data.amount.currency}</p>
                <h3 style="color: #2c3e50;">Verzonden naar:</h3>
                <p>
                    ${payment.data.shippingAddress?.streetAndNumber}<br>
                    ${payment.data.shippingAddress?.postalCode} ${payment.data.shippingAddress?.city}
                    ${payment.data.shippingAddress?.country}
                </p>
                <h3 style="color: #2c3e50;">Uw contactgegevens:</h3>
                <table style="border-collapse: collapse;">
                    <tbody>
                        <tr>
                            <td style="padding: 4px 8px; font-weight: bold;">Naam:</td>
                            <td style="padding: 4px 8px;">${payment.data.billingAddress?.givenName} ${payment.data.billingAddress?.familyName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 4px 8px; font-weight: bold;">E-mail:</td>
                            <td style="padding: 4px 8px;">${payment.data.billingAddress?.email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 4px 8px; font-weight: bold;">Telefoon:</td>
                            <td style="padding: 4px 8px;">${payment.data.billingAddress?.phone || 'Niet opgegeven'}</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    We streven ernaar uw bestelling zo snel mogelijk te verwerken en te verzenden. U ontvangt een bevestiging per e-mail zodra uw order is verzonden.
                </p>
                <p>
                    Nogmaals bedankt voor uw vertrouwen in Ode aan Schiedam. We hopen dat u tevreden zult zijn met uw aankoop!
                </p>
                <p>
                    Met vriendelijke groet,<br>
                    <strong>Het team van Ode aan Schiedam</strong>
                </p>
            </div>
        `

        // TODO: Send order to printify

        sendEmail('750@odeaanschiedam.nl', payment.data.billingAddress!.email, `Bevesting bestelling Ode aan Schiedam #${payment.data.id}`, emailText, '', emailHtml)
    }

    return new Response('OK', { status: 200 })
}