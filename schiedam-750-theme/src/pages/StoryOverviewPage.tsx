import React from "react"
import { useParams, NavLink } from "react-router-dom"
import { CustomRouteParams } from "../router"
import { DataLoader, loadData, loading, unloaded } from "../types/DataLoader"
import { PostCategory } from "../types/PostCategory"
import { None, Option, Some } from "../types/Option"
import { LoadData } from "../components/LoadData"
import { WordPressPage } from "../types/WordPressPage"
import { _paginate, Paginated } from "../types/Paginated"

type OverviewState = {
    category: DataLoader<Option<PostCategory>>
    stories: Array<DataLoader<Paginated<WordPressPage>>>
    nextPageToLoad: number
    pageSize: number
}

const zeroOverviewState = (): OverviewState => ({
    category: unloaded(),
    stories: [],
    nextPageToLoad: 1,
    pageSize: 5,
})

const loadStories = (_tag_id: number, _current_page: number, _page_size: number): DataLoader<Paginated<WordPressPage>> =>
    loading(loadData(`/wp-json/wp/v2/posts/?categories=${_tag_id}&page=${_current_page}&per_page=${_page_size}`, {
        parser: (json, headers) => _paginate<WordPressPage>(json, _current_page, _page_size, +headers.get('X-WP-TotalPages')!, +headers.get('X-WP-Total')!)
    }))

const loadNextStories = (_category: DataLoader<Option<PostCategory>>) => (s: OverviewState): OverviewState => {
    if (_category.kind != 'loaded') return s
    if (_category.v.kind == 'none') return s
    return ({
        ...s,
        nextPageToLoad: s.nextPageToLoad + 1,
        category: _category,
        stories: s.stories.concat([loadStories(_category.v.v.id, s.nextPageToLoad, s.pageSize)]),
    })
}

export const StoryOverviewPage = () => {
    const { category } = useParams<CustomRouteParams>()
    const [state, setState] = React.useState<OverviewState>(zeroOverviewState)

    React.useEffect(() => {
        setState(s => ({
            ...s, category: loading(loadData<Option<PostCategory>>(`/wp-json/wp/v2/categories?slug=${category}`, {
                parser: json => json.length > 0 ? Some(json[0]) : None()
            }))
        }))
    }, [category])

    if (state.category.kind != 'loaded') return <LoadData loader={state.category}
        updater={data => setState(loadNextStories(data))}
    />

    if (state.category.v.kind == 'none') return <div>Not found</div>

    const tag = state.category.v.v
    const loaded_stories = state.stories.reduce<WordPressPage[]>((xs, x) => xs.concat(x.getValue().visit(p => p.values, () => [])), [])
    const totalPages = state.stories.reduce((_, x) => x.getValue().visit(p => p.total_pages, () => 0), 0)

    return <div className="story-overview">
        <header className="overview-header">
            <h1>{tag.name}</h1>
            <p>{tag.description}</p>
        </header>
        <div className="overview-content">
            {
                state.stories.map((loader, index) => <LoadData key={index}
                    loader={loader}
                    updater={data => {
                        let loadedStories = state.stories
                        loadedStories[index] = data
                        setState((s => ({ ...s, stories: loadedStories })))
                    }}
                />)
            }
            {
                loaded_stories
                    .map(story => <div key={story.id}>
                        <h2>{story.title.rendered}</h2>
                        <p dangerouslySetInnerHTML={{ __html: story.excerpt.rendered }}></p>
                        <NavLink to={`/${story.slug}/ode/`}>Lees meer</NavLink>
                    </div>)
            }
            {
                state.nextPageToLoad <= totalPages &&
                <button onClick={() => setState(loadNextStories(state.category))}>
                    Laad meer...
                </button>
            }
        </div>
    </div >
}