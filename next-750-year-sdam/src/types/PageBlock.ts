import { EndPoint } from "@/services/StrapiCMSService"
import { StrapiImage } from "./StrapiImage"
import { PostCategory } from "./PostCategory"

export type PageBlock =
    TextBlockProps |
    TextWithImageBlockProps |
    CallToActionBlockProps |
    FormBlockProps |
    ImageBlockProps |
    ImageSliderBlockProps

export type TextBlockProps = {
    __component: "blocks.text"
    id: number
    Title?: string
    Description: string
}

export type TextWithImageBlockProps = {
    __component: "blocks.text-image"
    id: number
    Title?: string
    Description: string
    Image: StrapiImage
    Direction: "Left" | "Right"
}

export type CallToActionBlockProps = {
    __component: "blocks.call-to-action-cta"
    id: number
    Title?: string
    Description: string
    Image?: StrapiImage
    Button: Button[]
    Color: 'sunny-yellow' | 'fiery-red' | 'leafy-green' | 'sky-blue' | 'royal-purple' | 'sunset-orange'
}

export type FormBlockProps = {
    __component: "blocks.form"
    id: number
    form: {
        id: number
        documentId: string
        Title: string
        SubmissionText: string
        submit_url: EndPoint
        Fields: StrapiFormField[]
    }
}

export type ImageBlockProps = {
    __component: "blocks.image"
    id: number
    Caption: string
    Media: StrapiImage
}

export type ImageSliderBlockProps = {
    __component: "blocks.image-slider"
    id: number
    Images: StrapiImage[]
}


export type StrapiFormField = StandardFormField | CategoriesDropDown | InfoText | DropDown

type StandardFormField = {
    __component: "form-fields.text" | "form-fields.email" | "form-fields.textarea" | "form-fields.checkbox" | "form-fields.password" | "form-fields.number" | "form-fields.date-picker" | "form-fields.time-select"
    label: string
    required: boolean
    name: string
}

type CategoriesDropDown = {
    __component: "form-fields.categories-dropdown"
    label: string
    name: string
    required: boolean
    categories: PostCategory[]
}

type DropDown = {
    __component: "form-fields.dropdown"
    label: string
    name: string
    required: boolean
    Options: DropDownOption[]
}

type DropDownOption = {
    Name: string
    Value: string
}
type InfoText = {
    __component: "form-fields.info-text"
    Message: string
}

type Button = {
    id: number
    Title: string
    URL: string
}

export type MenuItem = Button