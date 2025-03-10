import { FooterMenu } from "@/types/Footer"
import { MainMenu } from "@/types/MainMenu"
import { PostCategory } from "@/types/PostCategory"
import { SiteInfo } from "@/types/SiteInfo"
import { StrapiData } from "@/types/StrapiData"
import { StrapiHomePage } from "@/types/StrapiHomePage"
import { StrapiPage } from "@/types/StrapiPage"
import { StrapiPoem } from "@/types/StrapiPoem"
import { notFound } from "next/navigation"

type Either<a, b> = { kind: 'left', v: a } | { kind: 'right', v: b }

type CreateResponse = Either<true, string>

export type EndPoint = "site-info" | "homepage" | "categories" | "pages" | "poems" | "main-menu" | "footer-menu" | "submissions"

type Populate = "Blocks" | "Blocks.Button" | "Blocks.Image" | "Logo" | "Columns.Items" | "Blocks.form" | "Blocks.form.Fields" | "Blocks.form.Fields.categories" | "Blocks.form.Fields.Options"

type Filter = {
    field: "slug" | "category][slug"
    operator: "$eq" | "$eqi" | "$ne" | "$nei" | "$lt" | "$lte" | "$gt" | "$gte" | "$in" | "$notIn" | "$contains" | "$notContains" | "$containsi" | "$notContainsi" | "$null" | "$notNull" | "$between" | "$startsWith" | "$startsWithi" | "$endsWith" | "$endsWithi" | "$or" | "$and" | "$not"
    value: string
}

type StrapiOptions = Partial<{
    populate: Populate[]
    filters: Filter[]
    method: 'GET' | 'POST'
    body: string
}>

export class StrapiCMSService {
    private STRAPI_CMS_URL: string
    constructor() {
        this.STRAPI_CMS_URL = process.env.STRAPI_CMS_URL != undefined ? process.env.STRAPI_CMS_URL : "http://localhost:1337"
    }

    private async StrapiFetch<T>(end_point: EndPoint, options: StrapiOptions = {}): Promise<StrapiData<T>> {
        const { populate, filters, method, body } = options
        const _filters = filters ? filters.reduce((xs, x) => `${xs}filters[${x.field}][${x.operator}]=${x.value}`, "") : ''
        const _populate = populate == undefined ? "populate=*&" : populate.reduce((xs, x, i) => `${xs}populate[${i}]=${x}&`, "")

        let _url = `${this.STRAPI_CMS_URL}/api/${end_point}/?${_populate}${_filters}`
        if (method == 'POST')
            _url = _url + 'status=draft'

        const response = await fetch(_url,
            {
                headers: { 
                    'Content-Type': 'application/json', 
                    'Accept': 'application/json',
                    'Authorization': 'bearer ' + process.env.STRAPI_API_TOKEN
                },
                method: method,
                body: body
            })

        console.log(response.url)
        if (response.status == 404) return notFound()
        if (response.ok) return await response.json()
        const error = `Error while fetching ${end_point} -> ${_populate}: ${response.status} ${response.statusText}: URL: ${response.url}`
        console.error(error)
        return Promise.reject(error)
    }

    public getSiteInfo = async (): Promise<StrapiData<SiteInfo>> =>
        this.StrapiFetch('site-info');

    public getPoemCounter = (): Promise<number> =>
        this.StrapiFetch<StrapiPoem[]>('poems').then(res => res.data.length)

    public GetHomePage = async (): Promise<StrapiData<StrapiHomePage>> =>
        this.StrapiFetch('homepage', { populate: ['Blocks', 'Blocks.Button', 'Blocks.Image', 'Logo'] })

    public GetCategories = async (): Promise<StrapiData<PostCategory[]>> =>
        this.StrapiFetch('categories')

    public GetCategoryBySlug = async (slug: string): Promise<PostCategory> =>
        this.StrapiFetch<PostCategory[]>('categories', { filters: [{ field: 'slug', operator: '$eq', value: slug }] })
            .then(categories => {
                if (categories.data.length == 0) return notFound()
                return categories.data[0]
            })

    public GetPage = async (slug: string): Promise<StrapiPage> =>
        this.StrapiFetch<StrapiPage[]>('pages', {
            populate: ['Blocks', 'Blocks.Button', 'Blocks.Image', 'Blocks.form', 'Blocks.form.Fields', 'Blocks.form.Fields.categories', 'Blocks.form.Fields.Options'],
            filters: [{ field: 'slug', operator: '$eq', value: slug }]
        })
            .then(pages => {
                if (pages.data.length == 0) return notFound()
                return pages.data[0]
            })

    public GetPoem = async (slug: string): Promise<StrapiPoem> =>
        this.StrapiFetch<StrapiPoem[]>('poems', { filters: [{ field: 'slug', operator: '$eq', value: slug }] })
            .then(pages => {
                if (pages.data.length == 0) return notFound()
                return pages.data[0]
            })

    public SubmitFormBody = async <T>(end_point: EndPoint, _body: StrapiData<T>): Promise<CreateResponse> =>
        this.StrapiFetch(end_point, {
            method: 'POST',
            body: JSON.stringify(_body)
        })
            .then(() => ({ kind: 'left', v: true } as CreateResponse))
            .catch((reason) => ({ kind: 'right', v: reason } as CreateResponse))

    public GetAllPoems = async (): Promise<StrapiData<StrapiPoem[]>> =>
        this.StrapiFetch('poems')

    public GetPoemsByCategory = (category: string): Promise<StrapiData<StrapiPoem[]>> =>
        this.StrapiFetch('poems', { filters: [{ field: "category][slug", operator: '$eq', value: category }] })

    public GetMainMenu = async (): Promise<StrapiData<MainMenu>> =>
        this.StrapiFetch('main-menu')

    public GetFooterMenu = async (): Promise<StrapiData<FooterMenu>> =>
        this.StrapiFetch('footer-menu', { populate: ["Columns.Items"] })

}