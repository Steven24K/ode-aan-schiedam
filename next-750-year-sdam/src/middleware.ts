import { StrapiCMSService } from '@/services/StrapiCMSService'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/willekeurig')) {

        const strapi = new StrapiCMSService()
        const poems = await strapi.GetAllPoems().then(res => res.kind == 'ok' ? res.data : [])
        if (poems.length > 0) {
            const randomPoem = poems[Math.floor(Math.random() * poems.length)]
            return NextResponse.redirect(new URL(`/ode/${randomPoem.slug}`, request.url))
        }
    }

    return NextResponse.next()
}