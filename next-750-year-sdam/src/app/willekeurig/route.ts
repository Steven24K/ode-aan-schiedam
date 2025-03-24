import { StrapiCMSService } from "@/services/StrapiCMSService"
import { NextResponse } from "next/server"

export async function GET(request: Request): Promise<Response> {
    const request_url = new URL(request.url)
    const currentUrl = request_url.searchParams.get('current')

    const strapi = new StrapiCMSService()
    let poems = await strapi.GetAllPoems().then(res => res.kind == 'ok' ? res.data : [])
    if (currentUrl) {
        poems = poems.filter(poem => poem.slug !== currentUrl)
    }
    if (poems.length > 0) {
        const randomPoem = poems[Math.floor(Math.random() * poems.length)]
        return NextResponse.redirect(new URL(`/ode/${randomPoem.slug}`, request.url))
    }

    return NextResponse.redirect(new URL(`/`, request.url))
}

