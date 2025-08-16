import { StrapiCMSService } from "@/services/StrapiCMSService"
import { Grid, GridItem } from "../Grid"
import { Suspense } from "react"
import { Loader } from "../Loader"
import { PageBlock } from "@/types/PageBlock"

export const CategoriesBlock = async (props: PageBlock) => {
    const strapi = new StrapiCMSService()

    const getCategories = strapi.GetCategories().then(res => res.kind == 'ok' ? res.data : [])
    const category_grid = getCategories.then(categories => categories.map<GridItem>(cat => ({
        id: cat.id,
        title: cat.Title,
        slug: `/odes/${cat.slug}/`,
        color: cat.Color,
    })))

    return <Suspense fallback={<Loader />}>
        <Grid items={category_grid} />
    </Suspense>
} 