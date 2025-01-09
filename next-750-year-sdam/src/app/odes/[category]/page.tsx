import { DisplayContent } from "@/components/DisplayContent"
import { Grid, GridItem } from "@/components/Grid"
import { Hero } from "@/components/Hero"
import { StrapiCMSService } from "@/services/StrapiCMSService"
import { Params } from "@/types/Params"

type StoryOverviewProps = {
    params: Promise<Params>
}

export default async function StoryOverview(props: StoryOverviewProps) {
    const { params } = props
    const { category } = await params

    const strapi = new StrapiCMSService()

    const poems = strapi.GetPoemsByCategory(category || "none").then(res => res.data)

    return <main>
        <Hero title={poems.then(p => p.length > 0 ? p[0].category.Title : "Categorie niet gevonden")}
            description={poems.then(p => p.length > 0 ? p[0].category.Description : '')}
            cta={{ text: "Terug naar het overzicht", to: '/?splashed=true' }}
        />
        <DisplayContent>
            <Grid items={poems.then(res => res.map<GridItem>(r => ({ id: r.id, color: r.category.Color, slug: `/ode/${r.slug}`, title: r.Title })))} />
        </DisplayContent>
    </main>
}