import { StrapiCMSService } from "@/services/StrapiCMSService"
import { FormatDate } from "@/utils"
import Image from "next/image"

export const PodcastGrid = async () => {

    const strapi = new StrapiCMSService()
    const data = await strapi.getPodcastEpisodes()
    if (data.kind == 'error') return <div className="text-lg border-2 border-gray-200 p-4 m-4">
        <p>Er zijn nog geen podcasts, kom later terug voor meer.</p>
    </div>
    const { podcastInfo, episodes } = data.data

    return <section className="latest-podcasts">
        <div className='podcasts-header'>
            <h2>{podcastInfo.Title}</h2>
        </div>
        <div className="podcasts-container">
            <div className="podcasts-grid">
                {episodes.map(episode => (
                    <a href={`/podcast/${episode.slug}`} key={episode.id} className="podcasts-card">
                        <Image src={episode.Thumbnail ? episode.Thumbnail.url : podcastInfo.Logo.url}
                            alt={episode.Title}
                            width={300} height={200}
                        />
                        <h3>{episode.Title}</h3>
                        <i>{FormatDate(episode.createdAt)}</i>
                        <hr />
                        <p>{episode.Description.substring(0, 100)}{episode.Description.length > 100 ? '...' : ''}</p>
                        <audio controls>
                            <source src={episode.Audio.url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </a>
                ))}
            </div>
        </div>
    </section>
}