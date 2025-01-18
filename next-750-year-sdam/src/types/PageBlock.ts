import { StrapiImage } from "./StrapiImage"

export type PageBlock =
    TextBlockProps |
    TextWithImageBlockProps |
    CallToActionBlockProps |
    PoemFormBlockProps

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

type Button = {
    id: number
    Title: string
    URL: string
}

export type MenuItem = Button