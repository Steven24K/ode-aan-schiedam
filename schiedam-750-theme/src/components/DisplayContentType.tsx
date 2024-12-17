import * as React from "react"
import { DataLoader, loadData, loading, unloaded } from "../types/DataLoader"
import { None, Option, Some } from "../types/Option"
import { WordPressPage } from "../types/WordPressPage"
import { LoadData } from "./LoadData"
import { useParams } from "react-router-dom"
import { CustomRouteParams } from "../router"

type ContentType = "pages" | "posts"

type PageProps = {
    children?: React.ReactNode
    isHome?: boolean
    content_type: ContentType
}

type PageState = {
    page: DataLoader<Option<WordPressPage>>
}

const zeroPageState = (): PageState => ({
    page: unloaded()
})

export const DisplayContentType = (props: PageProps) => {
    const { children, content_type, isHome } = props
    let { slug } = useParams<CustomRouteParams>()
    const [state, setState] = React.useState<PageState>(zeroPageState)

    if (isHome) slug = 'homepage'

    React.useEffect(() => {
        setState(s => ({
            ...s,
            page: loading(loadData<Option<WordPressPage>>(`/wp-json/wp/v2/${content_type}/?slug=${slug}`, {
                parser: json => json.length > 0 ? Some(json[0]) : None()
            }))
        }))
    }, [slug])

    if (state.page.kind != 'loaded') {
        return <LoadData
            loader={state.page}
            updater={data => setState(s => ({ ...s, page: data }))}
        />
    }

    if (state.page.v.kind == 'none') return <div>Not found</div>

    const page = state.page.v.v

    return <div className="container">
        <section className="row">
            <div className="col-12">
                <h1 className="flex-center">{page.title.rendered}</h1>
                <p dangerouslySetInnerHTML={{ __html: page.content.rendered }}></p>
            </div>
        </section>
        {children}
    </div>
}