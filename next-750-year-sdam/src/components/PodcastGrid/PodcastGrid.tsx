import { StrapiCMSService } from "@/services/StrapiCMSService"
import { PodcastGridLayout } from "./PodcastGrid.layout"
import { PageBlock } from "@/types/PageBlock"


export const PodcastGrid = async (props: PageBlock) => {
    const strapi = new StrapiCMSService()
    const data = await strapi.getPodcastEpisodes()
   
    return <PodcastGridLayout data={data} />
}