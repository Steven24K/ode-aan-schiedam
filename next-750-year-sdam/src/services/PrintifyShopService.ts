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

export interface PrintifyLineItem {
    product_id: string;
    variant_id: number;
    quantity: number;
    external_id?: string;
}
export interface PrintifyOrderRequest {
    external_id: string;
    label: string;
    line_items: Array<PrintifyLineItem>;
    shipping_method: number;
    is_printify_express?: boolean;
    is_economy_shipping?: boolean;
    send_shipping_notification?: boolean;
    address_to: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        country: string;
        region?: string;
        address1: string;
        address2?: string;
        city: string;
        zip: string;
    };
}

interface PrintifyOrderResponse {
    id: string
}

export const createPrintifyOrder = async (
    order: PrintifyOrderRequest
): Promise<ApiResult<PrintifyOrderResponse>> => {
    // To prevent sending orders to production when testing
    if (process.env.PRINTIFY_MODE === "production") {
        const url = `${process.env.PRINTIFY_ENDPOINT}/v1/shops/${process.env.PRINTIFY_SHOP_ID}/orders.json`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.PRINTIFY_API_KEY}`
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) return ApiError(response.statusText);
        const json = await response.json();
        return OkResult(json);
    }
    return OkResult({id: 'JUST_A_TEST_ORDER'})
};