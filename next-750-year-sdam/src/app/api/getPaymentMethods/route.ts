import { getMolliePaymentMethods } from "@/services/MolliePaymentService";

export async function GET(): Promise<Response> {
    const res = await getMolliePaymentMethods('nl_NL')
    if (res.kind === 'error') return Response.error()
    return Response.json(res.data)
}