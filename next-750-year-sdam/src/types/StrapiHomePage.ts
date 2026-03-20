import { PageBlock } from "./PageBlock"
import { StrapiImage } from "./StrapiImage"

export type StrapiHomePage = {
    id: number
    Title: string
    Description: string
    Blocks: PageBlock[]
}
