import * as React from "react"
import { DataLoader, loadData, loading, unloaded } from "../types/DataLoader"
import { None, Option, Some } from "../types/Option"
import { WordPressPage } from "../types/WordPressPage"
import { LoadData } from "./LoadData"
import { useParams } from "react-router-dom"
import { CustomRouteParams } from "../router"
import { StoryCounter } from "./StoryCounter"
import { NavLink } from "react-router-dom"
import { PostCategory } from "../types/PostCategory"

type ContentType = "pages" | "posts"

type PageProps = {
    children?: React.ReactNode
    isHome?: boolean
    content_type: ContentType
}

type PageState = {
    page: DataLoader<Option<WordPressPage>>
    category: DataLoader<Option<PostCategory>>
}

const zeroPageState = (): PageState => ({
    page: unloaded(),
    category: unloaded(),
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

    React.useEffect(() => {
        if (content_type == 'posts' && state.page.kind == 'loaded') {
            const page = state.page.v
            if (page.kind == 'some') {
                setState(s => ({
                    ...s,
                    category: loading(loadData<Option<PostCategory>>(`/wp-json/wp/v2/categories?post=${page.v.id}`, {
                        parser: json => json.length > 0 ? Some(json[0]) : None()
                    }))
                }))
            }
        }
    }, [state.page.kind])

    const page = state.page

    return <div className="content">
        {page.kind == 'loaded' && <header className="hero">
            <h1>{page.v.visit(p => p.title.rendered, () => "")}</h1>
            {
                state.category.kind == 'loaded' && state.category.v.kind == 'some' &&
                <NavLink to={`/odes/${state.category.v.v.slug}`}>
                    Terug naar {state.category.v.v.name}
                </NavLink>
            }
        </header>}
        {isHome && <StoryCounter />}

        <LoadData loader={state.category} updater={data => setState(s => ({ ...s, category: data }))} />

        <div className={`cms-content ${content_type}`}>
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