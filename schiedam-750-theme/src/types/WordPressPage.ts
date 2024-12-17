import { Rendered } from "./Rendered"

export type WordPressPage = {
    id: number
    date: number 
    slug: string
    title: Rendered
    content: Rendered
    excerpt: Rendered
}

