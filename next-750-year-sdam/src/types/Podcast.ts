import { StrapiImage } from "./StrapiImage"

export interface PodcastData {
    podcastInfo: PodcastInfo
    episodes: PodcastEpisode[]
}

export interface PodcastInfo {
    id: number
    Title: string
    Description: string
    Creator: string
    Contact: string
    Category: string
    Logo: StrapiImage
    publishedAt: string
    updatedAt: string
    createdAt: string
}

export interface PodcastEpisode {
    id: number
    documentId: string
    Title: string
    Description: string
    Thumbnail: StrapiImage
    slug: string
    publishedAt: string
    updatedAt: string
    createdAt: string
    Audio: {
        url: string
        name: string
    }
}
