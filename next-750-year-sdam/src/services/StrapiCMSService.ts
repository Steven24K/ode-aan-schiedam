import { FooterMenu } from "@/types/Footer"
import { MainMenu } from "@/types/MainMenu"
import { PostCategory } from "@/types/PostCategory"
import { SiteInfo } from "@/types/SiteInfo"
import { OkResult, ApiResult, StrapiData, ApiError } from "@/types/StrapiData"
import { StrapiHomePage } from "@/types/StrapiHomePage"
import { StrapiPage } from "@/types/StrapiPage"
import { StrapiPoem } from "@/types/StrapiPoem"

type Either<a, b> = { kind: 'left', v: a } | { kind: 'right', v: b }

type CreateResponse = Either<true, string>

export type EndPoint = "site-info" |
    "homepage" |
    "categories" |
    "pages" |
    "poems" |
    "main-menu" |
    "footer-menu" |
    "podcast" |
    "podcast-episodes"

type Populate = "Blocks" |
    "Blocks.Button" |
    "Blocks.Image" |
    "Blocks.form" |
    "Blocks.form.Fields" |
    "Blocks.form.Fields.categories" |
    "Blocks.form.Fields.Options" |
    "Blocks.Media" |
    "Columns.Items" |
    "Logo" |
    "Blocks.Images" |
    'Audio' | 
    'Thumbnail'

const populator: Populate[] = [
    'Blocks',
    'Blocks.Button',
    'Blocks.Image',
    'Blocks.form',
    'Blocks.form.Fields',
    'Blocks.form.Fields.categories',
    'Blocks.form.Fields.Options',
    'Blocks.Media',
    'Blocks.Images'
]

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
        if (response.ok) return await response.json()
        const error = `Error while fetching ${end_point} -> ${_populate}: ${response.status} ${response.statusText}: URL: ${response.url}`
        console.error(error)
        return Promise.reject(error)
    }

    public getPodcastEpisodes = async (): Promise<ApiResult<object>> =>
        this.StrapiFetch<object>('podcast')
            .then(podcastInfo => 
                this.StrapiFetch<object>('podcast-episodes', { populate: ['Audio', 'Thumbnail'] })
                .then(episodes => OkResult({ podcastInfo: podcastInfo.data, episodes: episodes.data }))
            )
            .catch(err => ApiError(err))

    public getSiteInfo = async (): Promise<ApiResult<SiteInfo>> =>
        this.StrapiFetch<SiteInfo>('site-info')
            .then(res => OkResult(res.data))
            .catch(err => ApiError(err))

    public getPoemCounter = (): Promise<ApiResult<number>> =>
        this.StrapiFetch<StrapiPoem[]>('poems')
            .then(res => OkResult(res.data.length))
            .catch(err => ApiError(err))

    public GetHomePage = async (): Promise<ApiResult<StrapiHomePage>> =>
        this.StrapiFetch<StrapiHomePage>('homepage', { populate: populator.concat(['Logo']) })
            .then(res => OkResult(res.data))
            .catch(err => ApiError(err))

    public GetCategories = async (): Promise<ApiResult<PostCategory[]>> =>
        this.StrapiFetch<PostCategory[]>('categories')
            .then(res => OkResult(res.data))
            .catch(err => ApiError(err))

    public GetCategoryBySlug = async (slug: string): Promise<ApiResult<PostCategory>> =>
        this.StrapiFetch<PostCategory[]>('categories', {
            populate: populator,
            filters: [{ field: 'slug', operator: '$eq', value: slug }]
        })
            .then(categories => {
                if (categories.data.length == 0) return Promise.reject('Category not found')
                return OkResult(categories.data[0])
            })
            .catch(err => ApiError(err))

    public GetPage = async (slug: string): Promise<ApiResult<StrapiPage>> =>
        this.StrapiFetch<StrapiPage[]>('pages', {
            populate: populator,
            filters: [{ field: 'slug', operator: '$eq', value: slug }]
        })
            .then(pages => {
                if (pages.data.length == 0) return Promise.reject('Page not found')
                return OkResult(pages.data[0])
            })
            .catch(err => ApiError(err))

    public GetPoem = async (slug: string): Promise<ApiResult<StrapiPoem>> =>
        this.StrapiFetch<StrapiPoem[]>('poems', {
            filters: [{ field: 'slug', operator: '$eq', value: slug }]
        })
            .then(pages => {
                if (pages.data.length == 0) return Promise.reject('Poem not found')
                return OkResult(pages.data[0])
            })
            .catch(err => ApiError(err))

    public SubmitFormBody = async <T>(end_point: EndPoint, _body: StrapiData<T>): Promise<CreateResponse> =>
        this.StrapiFetch(end_point, {
            method: 'POST',
            body: JSON.stringify(_body)
        })
            .then(() => ({ kind: 'left', v: true } as CreateResponse))
            .catch((reason) => ({ kind: 'right', v: reason } as CreateResponse))

    public GetAllPoems = async (): Promise<ApiResult<StrapiPoem[]>> =>
        this.StrapiFetch<StrapiPoem[]>('poems')
            .then(res => OkResult(res.data))
            .catch(err => ApiError(err))

    public GetPoemsByCategory = (category: string): Promise<ApiResult<StrapiPoem[]>> =>
        this.StrapiFetch<StrapiPoem[]>('poems', {
            filters: [{ field: "category][slug", operator: '$eq', value: category }]
        })
            .then(res => OkResult(res.data))
            .catch(err => ApiError(err))

    public GetMainMenu = async (): Promise<ApiResult<MainMenu>> =>
        this.StrapiFetch<MainMenu>('main-menu')
            .then(res => OkResult(res.data))
            .catch(err => ApiError(err))

    public GetFooterMenu = async (): Promise<ApiResult<FooterMenu>> =>
        this.StrapiFetch<FooterMenu>('footer-menu', {
            populate: ["Columns.Items"]
        })
            .then(res => OkResult(res.data))
            .catch(err => ApiError(err))

}