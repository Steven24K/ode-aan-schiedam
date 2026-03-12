import { PageBlock } from "@/types/PageBlock";
import { FC } from "react";
import { PoemSliderLayout } from "./PoemSlider.client";
import { StrapiCMSService } from "@/services/StrapiCMSService";
import { StrapiPoem } from "@/types/StrapiPoem";

export const PoemSliderBlock: FC<PageBlock> = async block => {
    if (block.__component != 'blocks.poem-slider') return <div>Block does not exist {JSON.stringify(block)}</div>

    let poems: StrapiPoem[] = []
    if (block.Selection) {
        poems = block.Poems
    } else {
        const strapi = new StrapiCMSService()
        const result = await strapi.GetAllPoems({page: 0, pageSize: 150, withCount: false})
        if (result.kind == 'ok') {
            poems = result.data
        }
    }


    return <PoemSliderLayout  poems={poems}/>
    
}