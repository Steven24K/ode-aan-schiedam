import { Color } from "./Color"
import { PageBlock } from "./PageBlock"

export type PostCategory = {
    documentId: string
    id: number
    Title: string
    Description: string
    Color: Color
    slug: string
    Blocks: PageBlock[]
}