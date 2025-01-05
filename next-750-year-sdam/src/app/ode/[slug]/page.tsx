import { DisplayContent } from "@/components/DisplayContent"
import { Hero } from "@/components/Hero"
import { Params } from "@/types/Params"

type StoryProps = {
    params: Promise<Partial<Params>>
}

export default async function StoryPage(props: StoryProps) {
    const { params } = props
    const { slug } = await params
    if (!slug) return <div>Story not found</div>

    const title = slug.replace(/^\w|-\w/g, (match) => match.replace('-', ' ').toUpperCase())
    return <main>
        <Hero title={Promise.resolve(title)}
            description="Door: William Shakespeare"
            cta={{ text: "Terug naar Poëzie", to: '/odes/poezie' }}
        />
        <DisplayContent>
            <p>
                Roses are red, violets are blue,
                Sugar is sweet, and so are you.
                The sun shines bright, the sky is clear,
                In this lovely town, there's nothing to fear.
            </p>
        </DisplayContent>
    </main>
} 