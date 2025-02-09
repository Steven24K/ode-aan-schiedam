import { EndPoint } from "@/services/StrapiCMSService"
import { StrapiImage } from "./StrapiImage"

export type PageBlock =
    TextBlockProps |
    TextWithImageBlockProps |
    CallToActionBlockProps |
    PoemFormBlockProps | 
    FormBlockProps

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
}

export type PoemFormBlockProps = {
    __component: "blocks.poem-form"
    id: number
    Title?: string
    Description?: string
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

export type StrapiFormField = {
    __component: "form-fields.text" | "form-fields.email" | "form-fields.textarea" | "form-fields.checkbox" | "form-fields.password" | "form-fields.number"
    label: string 
    required: boolean
    name: string
}

type Button = {
    id: number
    Title: string
    URL: string
}

export type MenuItem = Button