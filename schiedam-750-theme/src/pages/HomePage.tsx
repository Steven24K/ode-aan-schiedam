import * as React from "react"
import { NavLink } from "react-router-dom"
import { DisplayContentType } from "../components/DisplayContentType"
import { LoadData } from "../components/LoadData"
import { SplashScreen } from "../components/SplashScreen"
import { DataLoader, loadData, loading, unloaded } from "../types/DataLoader"
import { PostCategory } from "../types/PostCategory"
import { SiteInfo } from "../types/SiteInfo"

const parent_category = 7

type HomePageProps = { siteInfo: SiteInfo }
type HomePageState = { categories: DataLoader<PostCategory[]> }
const zeroHomePageState = (): HomePageState => ({
    categories: unloaded(),
})

export const HomePage = (props: HomePageProps) => {
    const { siteInfo } = props
    const [state, setState] = React.useState<HomePageState>(zeroHomePageState)

    if (state.categories.kind == 'unloaded')
        return <SplashScreen
            siteInfo={siteInfo}
            unSplash={() => setState(s => ({
                ...s,
                categories: loading(loadData<PostCategory[]>(`/wp-json/wp/v2/categories?parent=${parent_category}`))
            }))}
        />

    return <DisplayContentType isHome content_type="pages">
        <LoadData loader={state.categories} updater={data => setState(s => ({ ...s, categories: data }))} />
        <section className="categories">
            {
                state.categories
                    .getValue()
                    .map<React.ReactElement[]>(tags =>
                        tags.map(tag =>
                            <NavLink
                                key={tag.id}
                                className="category-item"
                                to={`/odes/${tag.slug}`}
                            >
                                <h2 className="category-title">{tag.name}</h2>
                            </NavLink>
                        ))
                    .visit<React.ReactNode>(
                        elememts => elememts,
                        () => <div className="nothing"></div>)
            }
        </section>
    </DisplayContentType>
}