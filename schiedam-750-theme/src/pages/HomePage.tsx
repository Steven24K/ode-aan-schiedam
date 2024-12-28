import * as React from "react"
import { DisplayContentType } from "../components/DisplayContentType"
import { LoadData } from "../components/LoadData"
import { SplashScreen } from "../components/SplashScreen"
import { DataLoader, loadData, loading, unloaded } from "../types/DataLoader"
import { PostCategory } from "../types/PostCategory"
import { SiteInfo } from "../types/SiteInfo"
import { Grid } from "../components/Grid"

const parent_category = 7

type HomePageProps = { siteInfo: SiteInfo }
type HomePageState = { categories: DataLoader<PostCategory[]> }
const zeroHomePageState = (): HomePageState => ({
    categories: unloaded()
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

        <Grid
            primary_color="yellow"
            secondary_color="black"
            text_color="yellow"
            items={state
                .categories
                .getValue()
                .map(tags => tags.map(tag => ({
                    id: tag.id,
                    title: tag.name,
                    url: `/odes/${tag.slug}`
                })))
                .visit(items => items, () => [])
            }
        />
    </DisplayContentType>
}