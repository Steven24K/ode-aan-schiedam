// import { Splash } from "@/components/Splash"
// import { cookies } from "next/headers"
import { Hero } from "@/components/Hero"
import { DisplayContent } from "@/components/DisplayContent"
import { StrapiCMSService } from "@/services/StrapiCMSService"
import { notFound } from "next/navigation"
import { PageProps } from "@/types/Params"

// const stringToBool = (v: string | undefined): boolean => {
//   if (v === 'false') return false
//   if (v === 'true') return true
//   return false
// }

export default async function Home(props: PageProps) {

  const strapi = new StrapiCMSService()
  const homepage = await strapi.GetHomePage()
  if (homepage.kind == 'error') return notFound()

  const title = homepage.data.Title
  const description = homepage.data.Description
  const blocks = homepage.data.Blocks

  // const logo = homepage.data.Logo
  // const cookieStore = await cookies()
  // const splashed = cookieStore.get('splashed')?.value

  // if (!stringToBool(splashed)) { // if not splashed, only splash onces
  //   return <Suspense fallback={<Loader />}>
  //     <Splash
  //       title={title}
  //       slogan={description}
  //       logo={logo}
  //     />
  //   </Suspense>
  // }

  return <>
    <Hero title={title} description={description} color={"sunny-yellow"} />
    <DisplayContent isHome blocks={blocks} pageParams={props} />
  </>
}
