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
        <Hero title={category} />
        <div className="page-content container mx-auto my-2 p-5">
            <Grid items={[
                {
                    id: 1,
                    title: "Whispers of the Wind",
                    color: "black",
                    slug: "/ode/whispers-of-the-wind/"
                },
                {
                    id: 2,
                    title: "Echoes of Time",
                    color: "black",
                    slug: "/ode/echoes-of-time/"
                },
                {
                    id: 3,
                    title: "Silent Reflections",
                    color: "black",
                    slug: "/ode/silent-reflections/"
                },
                {
                    id: 4,
                    title: "Dreams of the Past",
                    color: "black",
                    slug: "/ode/dreams-of-the-past/"
                }
            ]} />
        </div>

    </main>
}