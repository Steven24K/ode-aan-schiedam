import { PrintifyProduct, PrintifyProductPage } from "@/types/PrintifyProduct"
import { ApiError, ApiResult, OkResult } from "@/types/StrapiData"

export const getPrintifyProducts = async (limit?: number, page?: number): Promise<ApiResult<PrintifyProductPage>> => {
    const url = new URL(`${process.env.PRINTIFY_ENDPOINT}/v1/shops/${process.env.PRINTIFY_SHOP_ID}/products.json`)
    if (limit) url.searchParams.append('limit', limit.toString())
    if (page) url.searchParams.append('page', page.toString())
    const response = await fetch(url.toString(), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`
        }
    })
    if (!response.ok) return ApiError(response.statusText)
    let json = await response.json()
    return OkResult(json)
}

export const getPrintifyProductById = async (id: number): Promise<ApiResult<PrintifyProduct>> => {
        const response = await fetch(`${process.env.PRINTIFY_ENDPOINT}/v1/shops/${process.env.PRINTIFY_SHOP_ID}/products/${id}.json`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.PRINTIFY_API_KEY}`
        }
    })
    if (!response.ok) return ApiError(response.statusText)
    let json = await response.json()
    return OkResult(json)
}