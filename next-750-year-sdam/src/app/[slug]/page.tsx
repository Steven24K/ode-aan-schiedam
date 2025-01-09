import { DisplayContent } from "@/components/DisplayContent";
import { Hero } from "@/components/Hero";
import { StrapiCMSService } from "@/services/StrapiCMSService";
import { Params } from "@/types/Params";

type PageProps = {
    params: Promise<Partial<Params>>
}

export default async function CMSPage(props: PageProps) {
    const { params } = props
    const { slug } = await params

    const strapi = new StrapiCMSService()
    const page = strapi.GetPage(slug || '')
    

    return <main>
        <Hero title={StrapiCMSService.GetPageTitle(page)} description={StrapiCMSService.GetPageDescription(page)} />

        <DisplayContent blocks={StrapiCMSService.GetPageBlocks(page)}>

        </DisplayContent>
    </main>
}