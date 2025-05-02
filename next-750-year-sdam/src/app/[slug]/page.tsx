import { DisplayContent } from "@/components/DisplayContent";
import { Hero } from "@/components/Hero";
import { StrapiCMSService } from "@/services/StrapiCMSService";
import { PageProps } from "@/types/Params";
import { notFound } from "next/navigation";

export default async function CMSPage(props: PageProps) {
    const { params } = props
    const { slug } = await params

    const strapi = new StrapiCMSService()
    const page = await strapi.GetPage(slug)

    if (page.kind == 'error') return notFound()

    const title = page.data.Title
    const description = page.data.Description
    const blocks = page.data.Blocks

    return <>
        <Hero title={title}
            description={description}
            color={"sunny-yellow"}
            cta={{ text: "Ga terug naar home", to: "/" }}
        />

        <DisplayContent blocks={blocks} pageParams={props} />
    </>
}