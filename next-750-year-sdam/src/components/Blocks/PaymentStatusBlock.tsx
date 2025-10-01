import { getMolliePayment } from "@/services/MolliePaymentService"
import { PageBlock } from "@/types/PageBlock"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"


export const PaymentStatusBlock = async (block: PageBlock) => {
    if (block.__component !== 'blocks.payment-status') return <div>Block does not exist {JSON.stringify(block)}</div>

    const _cookies = await cookies()

    if (!_cookies.has('paymentId')) redirect('/')

    const { FailText, SuccessText } = block

    const paymentId = _cookies.get('paymentId')!

    const payment = await getMolliePayment(paymentId.value)

    const createdDate = payment.kind == 'ok' && payment.data.createdAt ? new Date(payment.data.createdAt) : null
    const now = new Date()
    const isTooOld = createdDate ? (now.getTime() - createdDate.getTime()) > 24 * 60 * 60 * 1000 : false

    if (payment.kind == 'error' || payment.data.status !== 'paid' || isTooOld) return <div className="text-xl">{FailText}</div>

    return <div key={block.id} className="bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto mt-6">
        <p className="text-xl mb-4">{SuccessText}</p>
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
            <p><span className="font-medium">Name:</span> {payment.data.shippingAddress?.givenName} {payment.data.shippingAddress?.familyName}</p>
            <p><span className="font-medium">Email:</span> {payment.data.shippingAddress?.email || '-'}</p>
            <p><span className="font-medium">Phone:</span> {payment.data.shippingAddress?.phone || '-'}</p>
        </div>
        <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
            <p>{payment.data.shippingAddress?.streetAndNumber}</p>
            <p>{payment.data.shippingAddress?.postalCode} {payment.data.shippingAddress?.city}</p>
            <p>{payment.data.shippingAddress?.country}</p>
        </div>
        <div>
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th className="border-b p-2">Product</th>
                        <th className="border-b p-2">Amount</th>
                        <th className="border-b p-2">Prijs/St.</th>
                        <th className="border-b p-2">VAT %</th>
                        <th className="border-b p-2">VAT</th>
                        <th className="border-b p-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {payment.data.lines?.map((line, idx: number) => (
                        <tr key={idx}>
                            <td className="p-2">
                                <a
                                    href={line.productUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline"
                                >
                                    {line.description}
                                </a>
                            </td>
                            <td className="p-2">{line.quantity}</td>
                            <td className="p-2">
                                {line.unitPrice?.value}
                            </td>
                            <td className="p-2">{line.vatRate ? `${line.vatRate}%` : '-'}</td>
                            <td className="p-2">
                                {line.vatAmount?.value}
                            </td>
                            <td className="p-2">
                                {line.totalAmount?.value} {line.totalAmount.currency}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 text-right font-bold">
                Total: {payment.data.amount?.value} {payment.data.amount?.currency}
            </div>
        </div>
    </div>
}