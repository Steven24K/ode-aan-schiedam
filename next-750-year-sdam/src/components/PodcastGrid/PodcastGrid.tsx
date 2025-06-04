import { StrapiCMSService } from "@/services/StrapiCMSService"
import { PodcastGridLayout } from "./PodcastGrid.layout"


export const PodcastGrid = async () => {
    const strapi = new StrapiCMSService()
    const data = await strapi.getPodcastEpisodes()
   
    return <PodcastGridLayout data={data} />
}