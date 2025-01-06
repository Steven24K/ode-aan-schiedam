import { StrapiImage } from "./StrapiImage"

export type StrapiHomePage = {
    id: number
    documentId: string
    Title: string
    Description?: string
    Blocks: Block[]
}

export type Block = {
    id: number
    Type: "text" | "text-image" | "cta"
    Title: string
    Content?: string
    Button?: Button[]
    Image?: StrapiImage
}

type Button = {
    id: number
    Title: string
    URL: string
}
