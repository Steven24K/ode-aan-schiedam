"use server"
import { Suspense } from "react"
import { Splash } from "@/components/Splash"
import { Hero } from "@/components/Hero"
import { DisplayContent } from "@/components/DisplayContent"
import { Grid, GridItem } from "@/components/Grid"
import { StoryCounter } from "@/components/StoryCounter"
import { SearchParams } from "@/types/Params"
import { getPoemCounter } from "./api/GetSiteInfo"
import { GetHomePage, GetHomePageBlocks, GetHomePageDescription, GetHomePageTitle, GetLogo } from "./api/GetHomePage"
import { GetCategories } from "./api/GetCategories"

const stringToBool = (v: string | undefined): boolean => {
  if (v === 'false') return false
  if (v === 'true') return true
  return false
}

type HomeProps = { searchParams: Promise<Partial<SearchParams>> }

export default async function Home(props: HomeProps) {
  const { searchParams } = props
  const { splashed } = await searchParams

  const homepage = GetHomePage()

  if (!stringToBool(splashed)) { // if not splashed, only splash onces
    return <Suspense fallback={<div>Loading...</div>}>
      <Splash
        title={GetHomePageTitle(homepage)}
        slogan={GetHomePageDescription(homepage)}
        logo={GetLogo(homepage)}
      />
    </Suspense>
  }

  return <main>
    <Suspense fallback={<div>Loading...</div>}>
      <Hero title={GetHomePageTitle(homepage)} description={GetHomePageDescription(homepage)} />
      <StoryCounter count={getPoemCounter()} />
      <DisplayContent blocks={GetHomePageBlocks(homepage)}>
        <Grid items={GetCategories().then(d => d.data.map<GridItem>(cat => ({
          id: cat.id,
          title: cat.Title,
          slug: `/odes/${cat.slug}/`,
          color: cat.Color,
        })))} />
      </DisplayContent>
    </Suspense>
  </main>
}
