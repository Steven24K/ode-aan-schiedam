import { DisplayContent } from "@/components/DisplayContent"
import { Hero } from "@/components/Hero"
import { SocialButtons } from "@/components/SocialButtons"
import { StrapiCMSService } from "@/services/StrapiCMSService"
import { PageProps } from "@/types/Params"
import { FormatDate } from "@/utils"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"


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
            color="leafy-green"
            cta={{ text: "Terug naar home", to: "/" }}
        />

        <DisplayContent childPositon="top" blocks={episode.Blocks} pageParams={props}>
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
        <DisplayContent pageParams={props}>
            <section className="my-4">
                <h2 className="text-4xl">{podcastInfo.Title}</h2>
                <p>Door: <i>{podcastInfo.Creator}</i></p>
                <p>{podcastInfo.Description}</p>
                <hr />
                <p>Genre: {podcastInfo.Category}</p>
            </section>
            {podcastInfo.Platforms.length > 0 && <section className="my-4">
                <h2 className="text-2xl">Luister ook op:</h2>
                <div className="flex flex-wrap gap-8">
                    {
                        podcastInfo.Platforms.map(platform =>
                            <Link key={platform.id} href={platform.Url} target="_blank" rel="noopener noreferrer">
                                {platform.Image && <Image src={platform.Image.url}
                                    alt={platform.Title}
                                    width={128}
                                    height={32}
                                    className=""
                                />}
                            </Link>)
                    }
                </div>
            </section>}
            <section className="my-4">
                <h2 className="text-2xl">Deel deze podcast:</h2>
                <SocialButtons />
            </section>
        </DisplayContent>
    </>
}