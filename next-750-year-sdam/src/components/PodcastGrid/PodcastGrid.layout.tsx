"use client"
import { useRef } from "react"
import Image from "next/image"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FormatDate } from "@/utils"
import { ApiResult } from "@/types/StrapiData"
import { PodcastData } from "@/types/Podcast"

library.add(faArrowRight, faArrowLeft)

type PodcastGridProps = {
    data: ApiResult<PodcastData>
}

export const PodcastGridLayout = (props: PodcastGridProps) => {
    const { data } = props
    const gridRef = useRef<HTMLDivElement>(null)

    if (data.kind == 'error') return <div className="text-lg border-2 border-gray-200 p-4 m-4">
        <p>Er zijn nog geen podcasts, kom later terug voor meer.</p>
    </div>

    const { podcastInfo, episodes } = data.data

    const scrollLeft = () => {
        if (!gridRef.current) return
        gridRef.current.scrollBy({ left: -300, behavior: 'smooth' });

    }

    const scrollRight = () => {
        if (!gridRef.current) return
        gridRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }


    return <section className="latest-podcasts">
        <div className='podcasts-header'>
            <button className="arrow" onClick={scrollLeft}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h2>{podcastInfo.Title}</h2>
            <button className="arrow" onClick={scrollRight}>
                <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>
        <div className="podcasts-container">
            <div ref={gridRef} className="podcasts-grid">
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
                        <div className="p-4 mx-10 my-2 border-4 border-red-600 hover:bg-red-600 text-red-500 hover:text-white text-center">
                            Luister nu
                        </div>
                    </a>
                ))}
            </div>
        </div>
    </section>
}