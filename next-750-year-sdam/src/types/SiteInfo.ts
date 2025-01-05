import { PostCategory } from "./PostCategory"
import { WpHomePage } from "./WpHomePage"

export type SiteInfo = {
    title: string
    slogan: string
    icon: string
    logo: string
    poem_count: number
    categories: PostCategory[]
    home_page: WpHomePage
}