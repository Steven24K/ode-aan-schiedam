import { DisplayContent } from "@/components/DisplayContent"
import { Grid } from "@/components/Grid"
import { Hero } from "@/components/Hero"
import { Params } from "@/types/Params"

type StoryOverviewProps = {
    params: Promise<Partial<Params>>
}

export default async function StoryOverview(props: StoryOverviewProps) {
    const { params } = props
    const { category } = await params
    if (!category) return <div>Category not found</div>

    return <main>
        <Hero title={Promise.resolve(category)}
            description={Promise.resolve("Een krachtig gedicht voor de stad")}
            cta={{ text: "Terug naar het overzicht", to: '/?splashed=true' }}
        />
        <DisplayContent>
            <Grid items={Promise.resolve([
                {
                    id: 1,
                    title: "Whispers of the Wind",
                    color: "just-black",
                    slug: "/ode/whispers-of-the-wind/"
                },
                {
                    id: 2,
                    title: "Echoes of Time",
                    color: "just-black",
                    slug: "/ode/echoes-of-time/"
                },
                {
                    id: 3,
                    title: "Silent Reflections",
                    color: "just-black",
                    slug: "/ode/silent-reflections/"
                },
                {
                    id: 4,
                    title: "Dreams of the Past",
                    color: "just-black",
                    slug: "/ode/dreams-of-the-past/"
                }
            ])} />
        </DisplayContent>
    </main>
}