export type WordPressPage = {
    id: number
    date: number 
    slug: string
    title: Rendered
    content: Rendered
    excerpt: Rendered
}

type Rendered = {
    rendered: string
}