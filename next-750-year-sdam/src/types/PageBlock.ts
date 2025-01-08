import { StrapiImage } from "./StrapiImage"

export type PageBlock = TextBlock | TextWithImageBlock | CallToActionBlock

type TextBlock = {
    __component: "blocks.text"
    id: number
    Title?: string
    Description: string
}

type TextWithImageBlock = {
    __component: "blocks.text-image"
    id: number
    Title?: string
    Description: string
    Image: StrapiImage
}

type CallToActionBlock = {
    __component: "blocks.call-to-action-cta"
    id: number
    Title?: string
    Description: string
    Image: StrapiImage
    Button: [Button, Button]
}

type Button = {
    id: number
    Title: string
    URL: string
}