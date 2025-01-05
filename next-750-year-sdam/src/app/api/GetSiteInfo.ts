import { GridItem } from "@/components/Grid"
import { SiteInfo } from "@/types/SiteInfo"

export const getSiteInfo = async (): Promise<SiteInfo> => {
  const response = await fetch(`http://localhost:8080/wp-json/custom/v1/site-info`)
  if (response.ok) return await response.json()
  return Promise.reject(`Error while fetching SiteInfo ${response.statusText}`)
}

export const getTitle = (_siteInfo: Promise<SiteInfo>): Promise<string> => _siteInfo.then(info => info.title)

export const getSlogan = (_siteInfo: Promise<SiteInfo>): Promise<string> => _siteInfo.then(info => info.slogan)

export const getLogo = (_siteInfo: Promise<SiteInfo>): Promise<string> => _siteInfo.then(info => info.logo)

export const getPoemCounter = (_siteInfo: Promise<SiteInfo>): Promise<number> => _siteInfo.then(info => info.poem_count)

export const getIcon = (_siteInfo: Promise<SiteInfo>): Promise<string> => _siteInfo.then(info => info.icon)

export const getCategoriesGrid = (_siteInfo: Promise<SiteInfo>): Promise<GridItem[]> =>
  _siteInfo.then(info => info.categories
    .map<GridItem>(cat => ({
      id: cat.term_id,
      title: cat.name,
      slug: `/odes/${cat.slug}/`,
      color: cat.color,
    }))
  )

export const getHomePageTitle = (_siteInfo: Promise<SiteInfo>): Promise<string> => _siteInfo.then(info => info.home_page.title)
export const getHomePageContent = (_siteInfo: Promise<SiteInfo>): Promise<string> => _siteInfo.then(info => info.home_page.content)