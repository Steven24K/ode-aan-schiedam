"use server"
import { Suspense } from "react"
import { Splash } from "@/components/Splash"
import { Hero } from "@/components/Hero"
import { DisplayContent } from "@/components/DisplayContent"
import { Grid, GridItem } from "@/components/Grid"
import { StoryCounter } from "@/components/StoryCounter"
import { SearchParams } from "@/types/Params"
import { StrapiCMSService } from "@/services/StrapiCMSService"
import { Loader } from "@/components/Loader"
import { notFound } from "next/navigation"

const stringToBool = (v: string | undefined): boolean => {
  if (v === 'false') return false
  if (v === 'true') return true
  return false
}

type HomeProps = { searchParams: Promise<Partial<SearchParams>> }

export default async function Home(props: HomeProps) {
  const { searchParams } = props
  const { splashed } = await searchParams

  const strapi = new StrapiCMSService()

  const homepage = await strapi.GetHomePage()

  if (homepage.kind == 'error') return notFound()

  const title = homepage.data.Title
  const description = homepage.data.Description
  const logo = homepage.data.Logo
  const blocks = homepage.data.Blocks

  if (!stringToBool(splashed)) { // if not splashed, only splash onces
    return <Suspense fallback={<Loader />}>
      <Splash
        title={title}
        slogan={description}
        logo={logo}
      />
    </Suspense>
  }

  const getCategories = strapi.GetCategories().then(res => res.kind == 'ok' ? res.data : [])
  const category_grid = getCategories.then(categories => categories.map<GridItem>(cat => ({
    id: cat.id,
    title: cat.Title,
    slug: `/odes/${cat.slug}/`,
    color: cat.Color,
  })))

  return <>
    <Hero title={title} description={description} color={"sunny-yellow"} />
    <StoryCounter />
    <Suspense fallback={<Loader />}>
        <Grid items={category_grid} />
      </Suspense>
    <DisplayContent blocks={blocks} childPositon="top" />
  </>
}
