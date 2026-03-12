import { FooterMenu } from "@/types/Footer"
import { MainMenu } from "@/types/MainMenu"
import { PodcastData, PodcastEpisode, PodcastInfo, SinglePodcast } from "@/types/Podcast"
import { PostCategory } from "@/types/PostCategory"
import { SiteInfo } from "@/types/SiteInfo"
import { OkResult, ApiResult, StrapiData, ApiError } from "@/types/StrapiData"
import { StrapiHomePage } from "@/types/StrapiHomePage"
import { StrapiPage } from "@/types/StrapiPage"
import { StrapiPoem } from "@/types/StrapiPoem"
import { StrapiPost } from "@/types/StrapiPost"

type Either<a, b> = { kind: 'left', v: a } | { kind: 'right', v: b }

type CreateResponse = Either<true, string>

const boolToString = (b: boolean): 'True' | 'False' => b ? 'True' : 'False'

export type EndPoint = "site-info" |
    "homepage" |
    "categories" |
    "pages" |
    "poems" |
    "main-menu" |
    "footer-menu" |
    "podcast" |
    "podcast-episodes" |
    "posts"

type Populate = "Blocks" |
    "Blocks.Button" |
    "Blocks.Image" |
    "Blocks.form" |
    "Blocks.form.Fields" |
    "Blocks.form.Fields.categories" |
    "Blocks.form.Fields.Options" |
    "Blocks.Media" |
    'Blocks.Poems' |
    "Columns.Items" |
    "Logo" |
    "Blocks.Images" |
    'Audio' |
    'Thumbnail' |
    'Platforms.Image' |
    'category'

const populator: Populate[] = [
    'Blocks',
    'Blocks.Button',
    'Blocks.Image',
    'Blocks.form',
    'Blocks.form.Fields',
    'Blocks.form.Fields.categories',
    'Blocks.form.Fields.Options',
    'Blocks.Media',
    'Blocks.Images',
    'Blocks.Poems'
]

type Filter = {
    field: "slug" | "category][slug"
    operator: "$eq" | "$eqi" | "$ne" | "$nei" | "$lt" | "$lte" | "$gt" | "$gte" | "$in" | "$notIn" | "$contains" | "$notContains" | "$containsi" | "$notContainsi" | "$null" | "$notNull" | "$between" | "$startsWith" | "$startsWithi" | "$endsWith" | "$endsWithi" | "$or" | "$and" | "$not"
    value: string
}

type StrapiOptions = Partial<{
    populate: Populate[]
    filters: Filter[]
    sort: string[]
    method: 'GET' | 'POST'
    body: string
    pagination: StrapiPagination
}>

type StrapiPagination = {
    page: number
    pageSize: number
    withCount: boolean
}

export class StrapiCMSService {
    private STRAPI_CMS_URL: string
    constructor() {
        this.STRAPI_CMS_URL = process.env.STRAPI_CMS_URL != undefined ? process.env.STRAPI_CMS_URL : "http://localhost:1337"
    }

    private async StrapiFetch<T>(end_point: EndPoint, options: StrapiOptions = {}): Promise<StrapiData<T>> {
        const { populate, filters, method, body, sort, pagination } = options

        const _filters = filters ? filters.reduce((xs, x) => `${xs}filters[${x.field}][${x.operator}]=${x.value}`, "") : ''
        const _populate = populate == undefined ? "populate=*&" : populate.reduce((xs, x, i) => `${xs}populate[${i}]=${x}&`, "")
        const _sort = sort ? sort.reduce((xs, x, i) => `${xs}sort[${i}]=${x}&`, "") : ''
        const _pagination = pagination ? `pagination[page]=${pagination.page}&pagination[pageSize]=${pagination.pageSize}&withCount=${boolToString(pagination.withCount)}` : ''

        let _url = `${this.STRAPI_CMS_URL}/api/${end_point}/?${_populate}${_filters}${_sort}${_pagination}`
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

    public getPodcastEpisodes = async (): Promise<ApiResult<PodcastData>> =>
        this.StrapiFetch<PodcastInfo>('podcast', {
            populate: ['Logo']
        })
            .then(podcastInfo =>
                this.StrapiFetch<PodcastEpisode[]>('podcast-episodes', {
                    populate: ['Thumbnail', 'Audio'],
                    sort: ['publishedAt:desc'],
                })
                    .then(episodes => OkResult({ podcastInfo: podcastInfo.data, episodes: episodes.data }))
            )
            .catch(err => ApiError(err))

    public getPodcastBySlug = async (slug: string): Promise<ApiResult<SinglePodcast>> =>
        this.StrapiFetch<PodcastInfo>('podcast', {
            populate: ['Platforms.Image', 'Logo']
        })
            .then(podcastInfo =>
                this.StrapiFetch<PodcastEpisode[]>('podcast-episodes', {
                    filters: [{ field: 'slug', operator: '$eq', value: slug }],
                    populate: populator.concat(['Audio', 'Thumbnail'])
                })
                    .then(episodes => {
                        if (episodes.data.length == 0) return Promise.reject('Podcast not found')
                        return OkResult({ podcastInfo: podcastInfo.data, episode: episodes.data[0] })
                    })
                    .catch(err => ApiError(err))
            )

    public getSiteInfo = async (): Promise<ApiResult<SiteInfo>> =>
        this.StrapiFetch<SiteInfo>('site-info')
            .then(res => OkResult(res.data))
            .catch(err => ApiError(err))

    public getPoemCounter = (): Promise<ApiResult<number>> =>
        this.StrapiFetch<StrapiPoem[]>('poems', { pagination: { page: 1, pageSize: 1, withCount: true } })
            .then(res_poems =>
                this.StrapiFetch<PodcastEpisode[]>('podcast-episodes', { pagination: { page: 1, pageSize: 1, withCount: true } })
                    .then(res_podcasts => {
                        const poem_count = res_poems.meta?.pagination?.total || 0
                        const podcast_count = res_podcasts.meta?.pagination?.total || 0
                        return OkResult(poem_count + podcast_count)
                    })
            )
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

    public GetAllPosts = async (_pagination?: StrapiPagination): Promise<ApiResult<StrapiPost[]>> =>
        this.StrapiFetch<StrapiPost[]>('posts', {
            pagination: _pagination,
            sort: ['createdAt:desc'],
        })
            .then(res => OkResult(res.data, res.meta))
            .catch(err => ApiError(err))

    public GetLatestPost = async (): Promise<ApiResult<StrapiPost>> =>
        this.StrapiFetch<StrapiPost[]>('posts', {
            pagination: { page: 1, pageSize: 1, withCount: false },
            populate: populator,
            sort: ['createdAt:desc'],
        })
            .then(res => {
                if (res.data.length == 0) return Promise.reject('No posts found')
                return OkResult(res.data[0])
            })
            .catch(err => ApiError(err))

    public GetPost = async (slug: string): Promise<ApiResult<StrapiPost>> =>
        this.StrapiFetch<StrapiPost[]>('posts', {
            populate: populator,
            filters: [{ field: 'slug', operator: '$eq', value: slug }],

        })
            .then(posts => {
                if (posts.data.length == 0) return Promise.reject('Post not found')
                return OkResult(posts.data[0])
            })
            .catch(err => ApiError(err))

    public GetPoem = async (slug: string): Promise<ApiResult<StrapiPoem>> =>
        this.StrapiFetch<StrapiPoem[]>('poems', {
            filters: [{ field: 'slug', operator: '$eq', value: slug }],
            populate: populator.concat(['category'])
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

    public GetAllPoems = async (_pagination?: StrapiPagination): Promise<ApiResult<StrapiPoem[]>> =>
        this.StrapiFetch<StrapiPoem[]>('poems', {
            pagination: _pagination,
            sort: ['createdAt:desc'],
        })
            .then(res => OkResult(res.data, res.meta))
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