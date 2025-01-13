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

  const homepage = strapi.GetHomePage()

  const title = homepage.then(home => home.data.Title)
  const description = homepage.then(home => home.data.Description)
  const logo = homepage.then(home => home.data.Logo)
  const blocks = homepage.then(home => home.data.Blocks)


  if (!stringToBool(splashed)) { // if not splashed, only splash onces
    return <Suspense fallback={<Loader />}>
      <Splash
        title={title}
        slogan={description}
        logo={logo}
      />
    </Suspense>
  }

  return <main>
    <Hero title={title} description={description} color="sunny-yellow" />
    <StoryCounter />
    <DisplayContent blocks={blocks}>
      <Suspense fallback={<Loader />}>
        <Grid items={strapi.GetCategories().then(d => d.data.map<GridItem>(cat => ({
          id: cat.id,
          title: cat.Title,
          slug: `/odes/${cat.slug}/`,
          color: cat.Color,
        })))} />
      </Suspense>
    </DisplayContent>
  </main>
}
