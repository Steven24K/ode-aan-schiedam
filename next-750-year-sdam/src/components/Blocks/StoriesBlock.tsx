import { StrapiCMSService } from "@/services/StrapiCMSService"
import { PageBlock } from "@/types/PageBlock"
import Link from "next/link"
import Markdown from "react-markdown"

const parseQueryNumber = (str: string | string[]): number => {
    if (Array.isArray(str)) return 1
    const number = parseInt(str, 10)
    return isNaN(number) ? 1 : number
}

export const StoriesBlock = async (props: PageBlock) => {
    if (props.__component !== 'blocks.stories') return <div>Block does not exist {JSON.stringify(props)}</div>

    const { max, paginated, pageParams } = props

    const _searchParams = await pageParams.searchParams

    const currentPage = _searchParams['page'] ?? '1'

    const strapi = new StrapiCMSService()

    const response = await strapi.GetAllPoems({
        page: parseQueryNumber(currentPage),
        pageSize: max,
        withCount: paginated,
    })
    if (response.kind == 'error') return <div>{response.error}</div>

    const poems = response.data

    const meta = response.meta
    const page = meta.pagination?.page || 0
    const pageCount = meta.pagination?.pageCount || 0
    
    const pageinationSize = 3

    const countUntil = pageCount <= pageinationSize ? pageCount : pageinationSize
    const countEnd = pageCount > pageinationSize ? pageCount - 2 : 0


    return <div className="flex flex-col gap-2">
        <h1 className="text-4xl">Recente odes</h1>
        <ul className="border-y my-4 border-yellow-500">
            {poems.map((poem, index) => {
                return <li key={index} className="py-4 px-2 border-b border-yellow-300 last:border-b-0">
                    <h2 className="text-2xl">{poem.Title}</h2>
                    <Link href={`/odes/${poem.category.slug}`} className="underline text-blue-600 hover:text-blue-800 transition-colors duration-200 ease-in-out">{poem.category.Title}</Link>
                    {poem.Author && <p>Een ode van: <i>{poem.Author}</i></p>}
                    <Markdown className='text-base'>
                        {poem.Content.slice(0, 200) + '...'}
                    </Markdown>
                    <Link href={`/ode/${poem.slug}`} className="p-2 my-1 border-4 border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-center transition-colors duration-200 ease-in-out">
                        Lees verder
                    </Link>
                </li>
            })}
        </ul>

        {
            paginated && <div className="mb-4">
                {page > 1 && (
                    <Link href={`?page=${page - 1}`} className="mr-2 px-2 py-1 border border-yellow-500 bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors duration-200 ease-in-out">
                        Vorige
                    </Link>
                )}

                {
                    Array.from({ length: countUntil }, (_, i) => i + 1).map((pageNumber) => {
                        return <Link key={pageNumber} href={`?page=${pageNumber}`} className={`px-2 py-1 border border-yellow-500 ${page == pageNumber ? 'bg-yellow-500 text-white' : 'bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors duration-200 ease-in-out'}`}>
                            {pageNumber}
                        </Link>
                    }
                    )
                }

                {countEnd > 0 && <span className="px-2 py-1 border border-yellow-500 bg-white text-yellow-500">...</span>}

                {
                    countEnd > 0 &&
                    Array.from({ length: countEnd }, (_, i) => i + (pageCount - countEnd + 1)).map((pageNumber) => {
                        return <Link key={pageNumber} href={`?page=${pageNumber}`} className={`px-2 py-1 border border-yellow-500 ${page == pageNumber ? 'bg-yellow-500 text-white' : 'bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors duration-200 ease-in-out'}`}>
                            {pageNumber}
                        </Link>
                    })
                }

                {page < pageCount && (
                    <Link href={`?page=${page + 1}`} className="ml-2 px-2 py-1 border border-yellow-500 bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors duration-200 ease-in-out">
                        Volgende
                    </Link>
                )}
            </div>
        }
    </div>
}