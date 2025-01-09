import { FooterMenu } from "@/types/Footer"
import { MainMenu } from "@/types/MainMenu"
import { PageBlock } from "@/types/PageBlock"
import { PostCategory } from "@/types/PostCategory"
import { SiteInfo } from "@/types/SiteInfo"
import { StrapiData } from "@/types/StrapiData"
import { StrapiHomePage } from "@/types/StrapiHomePage"
import { StrapiImage } from "@/types/StrapiImage"
import { StrapiPage } from "@/types/StrapiPage"
import { StrapiPoem } from "@/types/StrapiPoem"

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
        ///api/pages?filters[slug][$eq]=wat-is-een-ode
        const _filters = filters ? filters.reduce((xs, x) => `${xs}filters[${x.field}][${x.operator}]=${x.value}`, "") : ''
        const _populate = populate == undefined ? "populate=*&" : populate.reduce((xs, x, i) => `${xs}populate[${i}]=${x}&`, "")
        const response = await fetch(`${this.STRAPI_CMS_URL}/api/${end_point}/?${_populate}${_filters}`)
        console.log(response.url)
        if (response.ok) return await response.json()
        const error = `Error while fetching ${end_point} -> ${_populate}: ${response.statusText}: URL: ${response.url}`
        console.error(error)
        return Promise.reject(error)
    }

    public getSiteInfo = async (): Promise<StrapiData<SiteInfo>> =>
        this.StrapiGet('site-info');

    public static getTitle = async (_siteInfo: Promise<StrapiData<SiteInfo>>): Promise<string> =>
        _siteInfo.then(info => info.data.SiteName);
    public static getSlogan = async (_siteInfo: Promise<StrapiData<SiteInfo>>): Promise<string> =>
        _siteInfo.then(info => info.data.Slogan);
    public static getIcon = async (_siteInfo: Promise<StrapiData<SiteInfo>>): Promise<StrapiImage> =>
        _siteInfo.then(info => info.data.Icon);

    public getPoemCounter = (): Promise<number> =>
        Promise.resolve(69)

    public GetHomePage = async (): Promise<StrapiData<StrapiHomePage>> =>
        this.StrapiGet('homepage', { populate: ['Blocks', 'Blocks.Button', 'Blocks.Image', 'Logo'] })

    public static GetHomePageTitle = (homepage: Promise<StrapiData<StrapiHomePage>>): Promise<string> =>
        homepage.then(home => home.data.Title).catch(reason => reason)
    public static GetHomePageDescription = (homepage: Promise<StrapiData<StrapiHomePage>>): Promise<string> =>
        homepage.then(home => home.data.Description).catch(reason => reason)
    public static GetLogo = (homepage: Promise<StrapiData<StrapiHomePage>>): Promise<StrapiImage> =>
        homepage.then(home => home.data.Logo).catch(reason => reason)
    public static GetHomePageBlocks = (homepage: Promise<StrapiData<StrapiHomePage>>): Promise<PageBlock[]> =>
        homepage.then(home => home.data.Blocks).catch(reason => [{ id: 1, __component: 'blocks.text', Description: reason }] as PageBlock[])

    public GetCategories = async (): Promise<StrapiData<PostCategory[]>> =>
        this.StrapiGet('categories')

    public GetPage = async (slug: string): Promise<StrapiPage | undefined> =>
        this.StrapiGet<StrapiPage[]>('pages', {
            populate: ['Blocks', 'Blocks.Button', 'Blocks.Image'],
            filters: [{ field: 'slug', operator: '$eq', value: slug }]
        })
            .then(pages => pages.data.length == 0 ? undefined : pages.data[0])

    public static GetPageTitle = async (page: Promise<StrapiPage | undefined>): Promise<string> => page.then(p => p?.Title || "")
    public static GetPageDescription = async (page: Promise<StrapiPage | undefined>): Promise<string> => page.then(p => p?.Description || "")
    public static GetPageBlocks = async (page: Promise<StrapiPage | undefined>): Promise<PageBlock[]> => page.then(p => p?.Blocks || [])

    public GetPoem = async (slug: string): Promise<StrapiPoem | undefined> =>
        this.StrapiGet<StrapiPoem[]>('poems', { filters: [{ field: 'slug', operator: '$eq', value: slug }] })
            .then(pages => pages.data.length == 0 ? undefined : pages.data[0])

    public static GetPoemTitle = async (poem: Promise<StrapiPoem | undefined>): Promise<string> =>
        poem.then(p => p?.Title || "")

    public static GetPoemAuthor = async (poem: Promise<StrapiPoem | undefined>): Promise<string> =>
        poem.then(p => p?.Author || "")

    public static GetPoemContent = async (poem: Promise<StrapiPoem | undefined>): Promise<string> =>
        poem.then(p => p?.Content || "")


    public static GetPoemCategory = async (poem: Promise<StrapiPoem | undefined>): Promise<PostCategory> =>
        poem.then(p => p?.category || ({ id: 1, Color: "fiery-red", Description: '', slug: '/', Title: 'Geen categorie' }))

    public GetPoemsByCategory = (category: string): Promise<StrapiData<StrapiPoem[]>> =>
        this.StrapiGet('poems', { filters: [{ field: "category][slug", operator: '$eq', value: category }] })

    public GetMainMenu = async (): Promise<StrapiData<MainMenu>> =>
        this.StrapiGet('main-menu')

    public GetFooterMenu = async (): Promise<StrapiData<FooterMenu>> =>
        this.StrapiGet('footer-menu', { populate: ["Columns.Items"] })


}