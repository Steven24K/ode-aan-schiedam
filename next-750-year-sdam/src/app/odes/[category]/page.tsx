import { DisplayContent } from "@/components/DisplayContent"
import { Grid, GridItem } from "@/components/Grid"
import { Hero } from "@/components/Hero"
import { Loader } from "@/components/Loader"
import { StrapiCMSService } from "@/services/StrapiCMSService"
import { Params } from "@/types/Params"
import { Suspense } from "react"

type StoryOverviewProps = {
    params: Promise<Params>
}

export default async function StoryOverview(props: StoryOverviewProps) {
    const { params } = props
    const { category } = await params

    const strapi = new StrapiCMSService()

    const categoryInfo = strapi.GetCategoryBySlug(category)
    const poems = strapi.GetPoemsByCategory(category).then(res => res.data)

    const title = categoryInfo.then(cat => cat.Title)
    const description = categoryInfo.then(cat => cat.Description)
    const color = categoryInfo.then(cat => cat.Color)
    const blocks = categoryInfo.then(cat => cat.Blocks)
    const poem_grid = poems.then(res => res.map<GridItem>(r => ({ id: r.id, color: r.category.Color, slug: `/ode/${r.slug}`, title: r.Title })))

    return <>
        <Hero title={title}
            description={description}
            color={color}
            cta={{ text: "Terug naar het overzicht", to: '/?splashed=true' }}
        />
        <DisplayContent childPositon="bottom" blocks={blocks} >
            <Suspense fallback={<Loader />}>
                <Grid items={poem_grid} />
            </Suspense>
        </DisplayContent>
    </>
}