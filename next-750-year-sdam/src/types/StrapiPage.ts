import { PageBlock } from "./PageBlock"

export type StrapiPage = {
    id: number
    slug: string
    Title: string
    Description: string
    Blocks: PageBlock[]
}
