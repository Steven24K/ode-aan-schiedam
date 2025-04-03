import { StrapiCMSService } from "@/services/StrapiCMSService"
import { NextResponse } from "next/server"

export async function GET(request: Request): Promise<Response> {
    const strapi = new StrapiCMSService()
    const data = await strapi.getPodcastEpisodes()

    if (data.kind == 'error') return new Response(data.error, { status: 400 })

    const { podcastInfo, episodes } = data.data
    const url = new URL(request.url)

    const rssFeed = `<?xml version='1.0' encoding='UTF-8'?>
    <rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom">
            <channel>
                <atom:link href="${url.href}" rel="self" type="application/rss+xml" />
                <atom:link href="${url.origin}/podcast-feed" rel="next" type="application/rss+xml" />
                <title>${podcastInfo.Title}</title>
                <link>${url.origin}</link>
                <pubDate>${podcastInfo.publishedAt}</pubDate>
                <lastBuildDate>${podcastInfo.updatedAt}</lastBuildDate>
                <ttl>60</ttl>
                <language>nl</language>
                <copyright>All rights reserved</copyright>
                <webmaster>${podcastInfo.Contact}</webmaster>
                <description>${podcastInfo.Description}</description>
                <itunes:owner>
                    <itunes:name>${podcastInfo.Creator}</itunes:name>
                    <itunes:email>${podcastInfo.Contact}</itunes:email>
                </itunes:owner>
                <itunes:author>${podcastInfo.Creator}</itunes:author>
                <itunes:explicit>no</itunes:explicit>
                <itunes:image href="${url.origin}${podcastInfo.Logo.url}" />
                <image>
                    <url>${url.origin}${podcastInfo.Logo.url}</url>
                    <title>${podcastInfo.Title}</title>
                    <link>${url.origin}</link>
                </image>
                <itunes:category text="${podcastInfo.Category}">
                ${episodes.map(episode => `<item>
                    <guid isPermaLink="false">${episode.documentId}</guid>
                    <title>${episode.Title}</title>
                    <pubDate>${episode.publishedAt}</pubDate>
                    <link>${url.origin}/podcast/${episode.slug}</link>
                    <itunes:author>${podcastInfo.Creator}</itunes:author>
                    <itunes:explicit>no</itunes:explicit>
                    <itunes:summary>${episode.Description}</itunes:summary>
                    <description>${episode.Description}</description>
                    <enclosure type="audio/mpeg" url="${url.origin}${episode.Audio.url}" />
                    <itunes:image href="${url.origin}${episode.Thumbnail.url || podcastInfo.Logo.url}" />
                </item>`).join('')}
            </channel>
        </rss>`


    return new NextResponse(rssFeed, {
        headers: {
            'Content-Type': 'text/xml',
        },
    })
}