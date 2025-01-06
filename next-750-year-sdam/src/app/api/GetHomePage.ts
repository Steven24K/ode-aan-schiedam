import { StrapiData } from "@/types/StrapiData"
import { Block, StrapiHomePage } from "@/types/StrapiHomePage"

export const GetHomePage = async (): Promise<StrapiData<StrapiHomePage>> => {
    const response = await fetch(`http://localhost:1337/api/homepage/?populate[0]=Blocks&populate[1]=Blocks.Image&populate[2]=Blocks.Button`)
    if (response.ok) return await response.json()
    return Promise.reject(`Error while fetching HomePage ${response.statusText}`)
}

export const GetHomePageTitle = (homepage: Promise<StrapiData<StrapiHomePage>>): Promise<string> =>
    homepage.then(home => home.data.Title).catch(reason => reason)

export const GetHomePageDescription = (homepage: Promise<StrapiData<StrapiHomePage>>): Promise<string | undefined> =>
    homepage.then(home => home.data.Description).catch(reason => reason)

export const GetHomePageBlocks = (homepage: Promise<StrapiData<StrapiHomePage>>): Promise<Block[]> =>
    homepage.then(home => home.data.Blocks).catch(reason => [
        { id: 1, Type: 'text', Content: reason }
    ] as Block[])

