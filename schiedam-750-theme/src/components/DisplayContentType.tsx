import * as React from "react"
import { DataLoader, loadData, loading, unloaded } from "../types/DataLoader"
import { None, Option, Some } from "../types/Option"
import { WordPressPage } from "../types/WordPressPage"
import { LoadData } from "./LoadData"
import { useParams } from "react-router-dom"
import { CustomRouteParams } from "../router"
import { StoryCounter } from "./StoryCounter"

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

    const page = state.page

    return <div className="content">
        {page.kind == 'loaded' && <header className="hero flex flex-center flex-wrap">
            <h1>{page.v.visit(p => p.title.rendered, () => "")}</h1>
        </header>}
        {isHome && <StoryCounter />}
        <div className="cms-content">
            {page.kind == 'loaded' && <section className="row">
                <div className="col-12">
                    <p dangerouslySetInnerHTML={{ __html: page.v.visit(p => p.content.rendered, () => "") }}></p>
                </div>
            </section>}
            {children}
            <LoadData
                loader={state.page}
                updater={data => setState(s => ({ ...s, page: data }))}
            />
        </div>
    </div>
}