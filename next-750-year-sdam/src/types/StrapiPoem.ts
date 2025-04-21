import { PageBlock } from "./PageBlock"
import { PostCategory } from "./PostCategory"

export type StrapiPoem = {
    id: number
    slug: string
    Title: string
    Content: string
    Author: string
    category: PostCategory
    Email: string 
    Phone: string
    Blocks: PageBlock[]
}
