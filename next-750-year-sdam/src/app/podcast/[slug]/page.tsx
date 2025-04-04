import { DisplayContent } from "@/components/DisplayContent"
import { Hero } from "@/components/Hero"
import { StrapiCMSService } from "@/services/StrapiCMSService"
import { Params } from "@/types/Params"
import { notFound } from "next/navigation"


type PageProps = {
    params: Promise<Params>
}

export default async function PodcastPage(props: PageProps) {
    const { params } = props
    const { slug } = await params


    return <>
        <Hero title="Podcast page"
            description={`Page for ${slug}`}
            color="sunny-yellow"
            cta={{ text: "Terug naar home", to: "/" }}
        />

        <DisplayContent>
            <h1>TODO: Render podcast detail page here</h1>
        </DisplayContent>
    </>
}