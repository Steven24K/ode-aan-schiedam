import { CallToActionBlock } from "@/components/Blocks/CallToAction"
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
    const _categoryInfo = await categoryInfo
    const poems = strapi.GetPoemsByCategory(category).then(res => res.data)
    const _poems = await poems

    const title = categoryInfo.then(cat => cat.Title)
    const description = categoryInfo.then(cat => cat.Description)

    return <main>
        <Hero title={title}
            description={description}
            color={_categoryInfo.Color}
            cta={{ text: "Terug naar het overzicht", to: '/?splashed=true' }}
        />
        <DisplayContent>
            <Suspense fallback={<Loader />}>
                {
                    _poems.length == 0 &&
                    <CallToActionBlock
                        id={1}
                        __component="blocks.call-to-action-cta"
                        Description="Geen odes gevonden voor deze categorie"
                        Button={[{ id: 1, Title: "Schrijf je eigen ode", URL: '/' }]}
                    />
                }
                <Grid items={poems.then(res => res.map<GridItem>(r => ({ id: r.id, color: r.category.Color, slug: `/ode/${r.slug}`, title: r.Title })))} />
            </Suspense>
        </DisplayContent>
    </main>
}