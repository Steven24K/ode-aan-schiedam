import * as React from "react"
import { SplashScreen } from "../components/SplashScreen"
import { SiteInfo } from "../types/SiteInfo"
import { DisplayContentType } from "../components/DisplayContentType"
import { DataLoader, loadData, loading, unloaded } from "../types/DataLoader"
import { PostCategory } from "../types/PostCategory"
import { LoadData } from "../components/LoadData"
import { NavLink } from "react-router-dom"

type HomePageProps = {
    siteInfo: SiteInfo
}

type HomePageState = {
    categories: DataLoader<PostCategory[]>
}

const zeroHomePageState = (): HomePageState => ({
    categories: unloaded(),
})

export const HomePage = (props: HomePageProps) => {
    const { siteInfo } = props
    const [state, setState] = React.useState<HomePageState>(zeroHomePageState)

    const parent_category = 7
    if (state.categories.kind == 'unloaded') return <SplashScreen
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
                            <div key={tag.id} className="category-item flex flex-center flex-column">
                                <h2 className="category-title">{tag.name}</h2>
                                <NavLink to={`/odes/${tag.slug}`} className="category-button">Bekijk alle odes over {tag.name}</NavLink>
                            </div>))
                    .visit<React.ReactNode>(
                        elememts => elememts,
                        () => <div className="nothing"></div>)
            }
        </section>
    </DisplayContentType>
}