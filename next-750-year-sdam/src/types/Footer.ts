import { MenuItem } from "./PageBlock"

export interface FooterMenu {
    Columns: FooterColumn[]
}

interface FooterColumn {
    id: number
    Title: string
    Items: MenuItem[]
}