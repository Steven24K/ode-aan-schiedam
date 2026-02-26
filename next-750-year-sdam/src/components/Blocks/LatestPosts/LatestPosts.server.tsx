import { PageBlock } from "@/types/PageBlock";
import React from "react";
import { LatestPostsLayout } from "./LatestPosts.client";
import { StrapiCMSService } from "@/services/StrapiCMSService";

export const LatestPostsBlock: React.FC<PageBlock> = async block => {
    if (block.__component != 'blocks.latest-post') return <div>Block does not exist {JSON.stringify(block)}</div>

    const strapi = new StrapiCMSService()

    const posts = await strapi.GetAllPosts({ page: 0, pageSize: block.Max, withCount: true })
    if (posts.kind == 'error') return <div>Kan berichten niet laden</div>

    return <LatestPostsLayout items={posts.data} />

}