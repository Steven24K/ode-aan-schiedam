import { PostCategory } from "@/types/PostCategory";
import { StrapiData } from "@/types/StrapiData";

export const GetCategories = async (): Promise<StrapiData<PostCategory[]>> => {
    const response = await fetch(`http://localhost:1337/api/categories`)
    if (response.ok) return await response.json()
    return Promise.reject(`Error while fetching categories ${response.statusText}`)
}

