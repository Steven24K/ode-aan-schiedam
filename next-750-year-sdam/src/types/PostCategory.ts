import { Color } from "./Color"

export type PostCategory = {
    term_id: number
    name: string
    slug: string
    description: string
    color: Color
}