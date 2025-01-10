import { FooterMenu } from "@/types/Footer"
import { MainMenu } from "@/types/MainMenu"
import { PostCategory } from "@/types/PostCategory"
import { SiteInfo } from "@/types/SiteInfo"
import { StrapiData } from "@/types/StrapiData"
import { StrapiHomePage } from "@/types/StrapiHomePage"
import { StrapiPage } from "@/types/StrapiPage"
import { StrapiPoem } from "@/types/StrapiPoem"
import { notFound } from "next/navigation"

type EndPoint = "site-info" | "homepage" | "categories" | "pages" | "poems" | "main-menu" | "footer-menu"

type Populate = "Blocks" | "Blocks.Button" | "Blocks.Image" | "Logo" | "Columns.Items"

type Filter = {
    field: "slug" | "category][slug"
    operator: "$eq" | "$eqi" | "$ne" | "$nei" | "$lt" | "$lte" | "$gt" | "$gte" | "$in" | "$notIn" | "$contains" | "$notContains" | "$containsi" | "$notContainsi" | "$null" | "$notNull" | "$between" | "$startsWith" | "$startsWithi" | "$endsWith" | "$endsWithi" | "$or" | "$and" | "$not"
    value: string
}

type StrapiOptions = Partial<{
    populate: Populate[]
    filters: Filter[]

}>

export class StrapiCMSService {
    private STRAPI_CMS_URL: string
    constructor() {
        this.STRAPI_CMS_URL = process.env.STRAPI_CMS_URL != undefined ? process.env.STRAPI_CMS_URL : ""
    }

    private async StrapiGet<T>(end_point: EndPoint, options: StrapiOptions = {}): Promise<StrapiData<T>> {
        const { populate, filters } = options
        const _filters = filters ? filters.reduce((xs, x) => `${xs}filters[${x.field}][${x.operator}]=${x.value}`, "") : ''
        const _populate = populate == undefined ? "populate=*&" : populate.reduce((xs, x, i) => `${xs}populate[${i}]=${x}&`, "")
        const response = await fetch(`${this.STRAPI_CMS_URL}/api/${end_point}/?${_populate}${_filters}`)
        console.log(response.url)
        if (response.status == 404) return notFound()
        if (response.ok) return await response.json()
        const error = `Error while fetching ${end_point} -> ${_populate}: ${response.statusText}: URL: ${response.url}`
        console.error(error)
        return Promise.reject(error)
    }

    public getSiteInfo = async (): Promise<StrapiData<SiteInfo>> =>
        this.StrapiGet('site-info');

    public getPoemCounter = (): Promise<number> =>
        this.StrapiGet<StrapiPoem[]>('poems').then(res => res.data.length)

    public GetHomePage = async (): Promise<StrapiData<StrapiHomePage>> =>
        this.StrapiGet('homepage', { populate: ['Blocks', 'Blocks.Button', 'Blocks.Image', 'Logo'] })

    public GetCategories = async (): Promise<StrapiData<PostCategory[]>> =>
        this.StrapiGet('categories')

    public GetCategoryBySlug = async (slug: string): Promise<PostCategory> =>
        this.StrapiGet<PostCategory[]>('categories', { filters: [{ field: 'slug', operator: '$eq', value: slug }] })
            .then(categories => {
                if (categories.data.length == 0) return notFound()
                return categories.data[0]
            })

    public GetPage = async (slug: string): Promise<StrapiPage> =>
        this.StrapiGet<StrapiPage[]>('pages', {
            populate: ['Blocks', 'Blocks.Button', 'Blocks.Image'],
            filters: [{ field: 'slug', operator: '$eq', value: slug }]
        })
            .then(pages => {
                if (pages.data.length == 0) return notFound()
                return pages.data[0]
            })

    public GetPoem = async (slug: string): Promise<StrapiPoem | undefined> =>
        this.StrapiGet<StrapiPoem[]>('poems', { filters: [{ field: 'slug', operator: '$eq', value: slug }] })
            .then(pages => {
                if (pages.data.length == 0) return notFound()
                return pages.data[0]
            })

    public GetPoemsByCategory = (category: string): Promise<StrapiData<StrapiPoem[]>> =>
        this.StrapiGet('poems', { filters: [{ field: "category][slug", operator: '$eq', value: category }] })

    public GetMainMenu = async (): Promise<StrapiData<MainMenu>> =>
        this.StrapiGet('main-menu')

    public GetFooterMenu = async (): Promise<StrapiData<FooterMenu>> =>
        this.StrapiGet('footer-menu', { populate: ["Columns.Items"] })

}