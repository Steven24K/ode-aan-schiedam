import { StrapiCMSService } from "@/services/StrapiCMSService"
import { FormatDate } from "@/utils"

export const PodcastGrid = async () => {

    const strapi = new StrapiCMSService()
    const data = await strapi.getPodcastEpisodes()
    if (data.kind == 'error') return <div>Error loading podcast episodes</div>
    const { podcastInfo, episodes } = data.data

    return <section className="latest-podcasts">
        <div className='podcasts-header'>
            <h2>{podcastInfo.Title}</h2>
        </div>
        <div className="podcasts-container">
            <div className="podcasts-grid">
                {episodes.map(episode => (
                    <a href={`/podcast/${episode.slug}`} key={episode.id} className="podcasts-card">
                        <img src={episode.Thumbnail.url || podcastInfo.Logo.url} alt={episode.Title} />
                        <h3>{episode.Title}</h3>
                        <i>{FormatDate(episode.createdAt)}</i>
                        <hr />
                        <p>{episode.Description}</p>
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