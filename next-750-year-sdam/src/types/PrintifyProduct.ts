export interface PrintifyProductPage {
    current_page: number;
    data: PrintifyProduct[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: null;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}

export interface PrintifyProduct {
    id: string;
    title: string;
    description: string;
    tags: string[];
    options: Option[];
    variants: PrintifyProductVariant[];
    images: PrintifyImage[];
    created_at: Date;
    updated_at: Date;
    visible: boolean;
    is_locked: boolean;
    blueprint_id: number;
    user_id: number;
    shop_id: number;
    print_provider_id: number;
    print_areas: PrintArea[];
    print_details: any[];
    sales_channel_properties: any[];
    is_printify_express_eligible: boolean;
    is_printify_express_enabled: boolean;
    is_economy_shipping_eligible: boolean;
    is_economy_shipping_enabled: boolean;
    is_deleted: boolean;
    original_product_id: string;
    views: View[];
    safety_information?: string;
}

interface PrintifyImage {
    src: string;
    variant_ids: number[];
    position: Position;
    is_default: boolean;
    is_selected_for_publishing: boolean;
    order: null;
}

enum Position {
    Back = "back",
    Front = "front",
    Other = "other",
}

interface Option {
    name: string;
    type: string;
    values: Value[];
    display_in_preview: boolean;
}

interface Value {
    id: number;
    title: string;
    colors?: string[];
}

interface PrintArea {
    variant_ids: number[];
    placeholders: Placeholder[];
    background?: string;
    font_color?: string;
    font_family?: string;
}

interface Placeholder {
    position: string;
    images: PlaceholderImage[];
    decoration_method: DecorationMethod;
}

enum DecorationMethod {
    Dtf = "dtf",
    Dtg = "dtg",
    DyeSublimation = "dye-sublimation",
}

interface PlaceholderImage {
    id: string;
    name: string;
    type: string;
    height: number;
    width: number;
    x: number;
    y: number;
    scale: number;
    angle: number;
    src?: string;
    font_family?: string;
    font_size?: number;
    font_weight?: number;
    font_color?: string;
    font_style?: string;
    input_text?: string;
    text_align?: string;
}

export interface PrintifyProductVariant {
    id: number;
    sku: string;
    cost: number;
    price: number;
    title: string;
    grams: number;
    is_enabled: boolean;
    is_default: boolean;
    is_available: boolean;
    is_printify_express_eligible: boolean;
    options: number[];
    quantity: number;
}

interface View {
    id: number;
    label: string;
    position: string;
    files: File[];
}

interface File {
    src: string;
    variant_ids: number[];
}

interface Link {
    url: null | string;
    label: string;
    active: boolean;
}