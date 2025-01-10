import { DisplayContent } from "@/components/DisplayContent";
import { Hero } from "@/components/Hero";
import { StrapiCMSService } from "@/services/StrapiCMSService";
import { Params } from "@/types/Params";

type PageProps = {
    params: Promise<Params>
}

export default async function CMSPage(props: PageProps) {
    const { params } = props
    const { slug } = await params

    const strapi = new StrapiCMSService()
    const page = strapi.GetPage(slug)

    const title = page.then(p => p.Title)
    const description = page.then(p => p.Description)
    const blocks = page.then(p => p.Blocks)

    return <main>
        <Hero title={title} description={description} />

        <DisplayContent blocks={blocks}>
        </DisplayContent>
    </main>
}