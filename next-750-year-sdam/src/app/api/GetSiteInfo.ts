import { SiteInfo } from "@/types/SiteInfo"
import { StrapiData } from "@/types/StrapiData"
import { StrapiImage } from "@/types/StrapiImage"

export const getSiteInfo = async (): Promise<StrapiData<SiteInfo>> => {
  const response = await fetch(`http://localhost:1337/api/site-info?populate=*`)
  if (response.ok) return await response.json()
  return Promise.reject(`Error while fetching SiteInfo ${response.statusText}`)
}

export const getTitle = (_siteInfo: Promise<StrapiData<SiteInfo>>): Promise<string> => _siteInfo.then(info => info.data.SiteName)

export const getSlogan = (_siteInfo: Promise<StrapiData<SiteInfo>>): Promise<string> => _siteInfo.then(info => info.data.Slogan)

export const getIcon = (_siteInfo: Promise<StrapiData<SiteInfo>>): Promise<StrapiImage> => _siteInfo.then(info => info.data.Icon)


export const getPoemCounter = (): Promise<number> => Promise.resolve(69)
