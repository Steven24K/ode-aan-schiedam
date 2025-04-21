import { DisplayContent } from "@/components/DisplayContent"
import { Hero } from "@/components/Hero"
import { SocialButtons } from "@/components/SocialButtons"
import { StrapiCMSService } from "@/services/StrapiCMSService"
import { Params } from "@/types/Params"
import { FormatDate } from "@/utils"
import Image from "next/image"
import { notFound } from "next/navigation"


type PageProps = {
    params: Promise<Params>
}

export default async function PodcastPage(props: PageProps) {
    const { params } = props
    const { slug } = await params

    const strapi = new StrapiCMSService()
    const data = await strapi.getPodcastBySlug(slug)
    if (data.kind == 'error') return notFound()
    const { podcastInfo, episode } = data.data


    return <>
        <Hero title={episode.Title}
            description={`Gepubliceerd op: ${FormatDate(episode.publishedAt)}`}
            color="sunny-yellow"
            cta={{ text: "Terug naar home", to: "/" }}
        />

        <DisplayContent childPositon="top" blocks={episode.Blocks}>
            <div className="player-container">
                <audio className="player" controls>
                    <source src={episode.Audio.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
                <Image src={episode.Thumbnail ? episode.Thumbnail.url : podcastInfo.Logo.url}
                    alt={episode.Title}
                    width={600} height={400}
                    className="img-fluid mb-2"
                />
            </div>
            <p className="my-4">{episode.Description}</p>

        </DisplayContent>
        <DisplayContent>
            <h2>{podcastInfo.Title}</h2>
            <p>Door: <i>{podcastInfo.Creator}</i></p>
            <p>{podcastInfo.Description}</p>
            <hr />
            <p>Genre: {podcastInfo.Category}</p>
            <section>
                <h2 className="text-2xl">Deel deze podcast:</h2>
                <SocialButtons />
            </section>
        </DisplayContent>
    </>
}