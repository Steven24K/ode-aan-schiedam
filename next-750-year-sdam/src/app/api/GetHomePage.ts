import { PageBlock } from "@/types/PageBlock"
import { StrapiData } from "@/types/StrapiData"
import { StrapiHomePage } from "@/types/StrapiHomePage"
import { StrapiImage } from "@/types/StrapiImage"

export const GetHomePage = async (): Promise<StrapiData<StrapiHomePage>> => {
    const response = await fetch(`http://localhost:1337/api/homepage/?populate[0]=Blocks&populate[1]=Blocks.Image&populate[2]=Blocks.Button&populate[3]=Logo`)
    if (response.ok) return await response.json()
    return Promise.reject(`Error while fetching HomePage ${response.statusText}`)
}

export const GetHomePageTitle = (homepage: Promise<StrapiData<StrapiHomePage>>): Promise<string> =>
    homepage.then(home => home.data.Title).catch(reason => reason)

export const GetHomePageDescription = (homepage: Promise<StrapiData<StrapiHomePage>>): Promise<string> =>
    homepage.then(home => home.data.Description).catch(reason => reason)

export const GetLogo = (homepage: Promise<StrapiData<StrapiHomePage>>): Promise<StrapiImage> =>
    homepage.then(home => home.data.Logo).catch(reason => reason)

export const GetHomePageBlocks = (homepage: Promise<StrapiData<StrapiHomePage>>): Promise<PageBlock[]> =>
    homepage.then(home => home.data.Blocks).catch(reason => [
        { id: 1, __component: 'blocks.text', Description: reason }
    ] as PageBlock[])

