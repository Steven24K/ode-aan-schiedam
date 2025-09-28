import { ApiError, ApiResult, OkResult } from "@/types/StrapiData";

export interface MolliePaymentBody {
    description: string
    amount: MollieCurrency
    redirectUrl: string
    webhookUrl: string
    lines: MollieOrderLine[]
    billingAddress?: MollieAdress
    shippingAddress?: MollieAdress
    metadata?: Record<string, any>
    locale: 'nl_NL' | 'nl_BE'
    method: 'ideal' | 'creditcard' | 'bancontact' | 'applepay' | 'googlepay' | 'sofort' | 'giftcard' | 'banktransfer'
}

interface MollieAdress {
    givenName: string
    familyName: string
    streetAndNumber: string
    postalCode: string
    email: string
    phone?: string
    city: string
    country: string
}

interface MollieCurrency {
    currency: string
    value: string
}

interface MollieOrderLine {
    type: 'physical'
    description: string
    quantity: number
    unitPrice: MollieCurrency
    discountAmount?: MollieCurrency
    totalAmount: MollieCurrency
    vatRate: string // i.e. 21.00
    vatAmount: MollieCurrency
    sku?: string
    productUrl?: string
}

export interface MolliePaymentResponse {
    resource: "payment";
    id: string;
    mode: "live" | "test";
    amount: {
        value: string;
        currency: string;
    };
    description: string;
    sequenceType: "oneoff" | "first" | "recurring";
    redirectUrl: string;
    webhookUrl: string;
    metadata?: string | Record<string, any>;
    profileId: string;
    status: "open" | "pending" | "paid" | "failed" | "expired" | "canceled" | "authorized" | "completed";
    isCancelable: boolean;
    createdAt: string;
    expiresAt?: string;
    _links: {
        self: {
            href: string;
            type: string;
        };
        checkout?: {
            href: string;
            type: string;
        };
        dashboard?: {
            href: string;
            type: string;
        };
        documentation?: {
            href: string;
            type: string;
        };
    };
}

export const createMolliePayment = async (body: MolliePaymentBody):Promise<ApiResult<MolliePaymentResponse>> => {
    const response = await fetch(`${process.env.MOLLIE_ENDPOINT}/v2/payments`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.MOLLIE_API_KEY}`
        },
        method: 'POST',
        body: JSON.stringify(body),
    })

    if (!response.ok) return ApiError(response.statusText)
    let json = await response.json()

    return OkResult(json)
} 

export interface MolliePaymentMethodList {
    count: number;
    _embedded: {
        methods: MolliePaymentMethod[];
    };
    _links: {
        self: {
            href: string;
            type: string;
        };
        documentation: {
            href: string;
            type: string;
        };
    };
}

interface MolliePaymentMethod {
    resource: "method";
    id: string;
    description: string;
    minimumAmount: {
        value: string;
        currency: string;
    };
    maximumAmount: {
        value: string;
        currency: string;
    };
    image: {
        size1x: string;
        size2x: string;
        svg: string;
    };
    status: string;
    _links: {
        self: {
            href: string;
            type: string;
        };
    };
}

export const getMolliePaymentMethods = async (locale: 'nl_NL' | 'nl_BE'): Promise<ApiResult<MolliePaymentMethodList>> => {
    const response = await fetch(`${process.env.MOLLIE_ENDPOINT}/v2/methods?locale=${locale}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.MOLLIE_API_KEY}`
        },
        method: 'GET',
    })

    if (!response.ok) return ApiError(response.statusText)
    let json = await response.json()

    return OkResult(json)
} 