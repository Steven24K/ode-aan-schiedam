import { StrapiCMSService } from "@/services/StrapiCMSService"

export async function GET(request: Request): Promise<Response> {
    const strapi = new StrapiCMSService()
    const episodes = await strapi.getPodcastEpisodes()
    
    const rssFeed = `<rss version="2.0">
            <channel>
                <title>Podcast Title</title>
                <link>https://example.com</link>
                <description>Podcast Description</description>
    
            </channel>
        </rss>`

    return new Response(rssFeed, {
        headers: {
            'Content-Type': 'application/rss+xml',
        },
    })
  }