type Params = {
    category: string
    slug: string
}

export type PageProps = {
    params: Promise<Params>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}