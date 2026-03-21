import { Hero } from "@/components/Hero"
import { DisplayContent } from "@/components/DisplayContent"
import { StrapiCMSService } from "@/services/StrapiCMSService"
import { notFound } from "next/navigation"
import { PageProps } from "@/types/Params"

export default async function Home(props: PageProps) {

  const strapi = new StrapiCMSService()
  const homepage = await strapi.GetHomePage()
  if (homepage.kind == 'error') return notFound()

  const title = homepage.data.Title
  const description = homepage.data.Description
  const blocks = homepage.data.Blocks

  return <>
    <Hero title={title} description={description} color={"fiery-red"} />
    <DisplayContent isHome blocks={blocks} pageParams={props} />
  </>
}
