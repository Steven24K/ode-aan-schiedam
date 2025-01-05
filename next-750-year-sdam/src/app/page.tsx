"use server"
import { Splash } from "@/components/Splash"
import { Hero } from "@/components/Hero"
import { DisplayContent } from "@/components/DisplayContent"
import { Grid } from "@/components/Grid"
import { StoryCounter } from "@/components/StoryCounter"
import { Suspense } from "react"
import { Params, SearchParams } from "@/types/Params"
import { getCategoriesGrid, getHomePageContent, getHomePageTitle, getLogo, getPoemCounter, getSiteInfo, getSlogan, getTitle } from "./api/GetSiteInfo"


const stringToBool = (v: string | undefined): boolean => {
  if (v === 'false') return false
  if (v === 'true') return true
  return false
}

type HomeProps = {
  params: Promise<Partial<Params>>
  searchParams: Promise<Partial<SearchParams>>
}

export default async function Home(props: HomeProps) {
  const { searchParams } = props
  const { splashed } = await searchParams

  const siteInfo = getSiteInfo()

  if (!stringToBool(splashed)) { // if not splashed, only splash onces
    return <Suspense fallback={<div>Loading...</div>}>
      <Splash
        title={getTitle(siteInfo)}
        slogan={getSlogan(siteInfo)}
        logo={getLogo(siteInfo)}
      />
    </Suspense>
  }

  return <main>
    <Suspense fallback={<div>Loading...</div>}>
      <Hero title={getHomePageTitle(siteInfo)} />
      <StoryCounter count={getPoemCounter(siteInfo)} />
      <DisplayContent content={getHomePageContent(siteInfo)}>
        <Grid items={getCategoriesGrid(siteInfo)} />
      </DisplayContent>
    </Suspense>
  </main>
}
