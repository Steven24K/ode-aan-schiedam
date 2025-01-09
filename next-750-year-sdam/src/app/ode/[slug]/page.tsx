import { DisplayContent } from "@/components/DisplayContent"
import { Hero } from "@/components/Hero"
import { StrapiCMSService } from "@/services/StrapiCMSService"
import { Params } from "@/types/Params"
import Markdown from "react-markdown"

type StoryProps = {
    params: Promise<Partial<Params>>
}

export default async function StoryPage(props: StoryProps) {
    const { params } = props
    const { slug } = await params

    const strapi = new StrapiCMSService()
    const poem = strapi.GetPoem(slug || 'null')

    const _category = await StrapiCMSService.GetPoemCategory(poem)
    const _content = await StrapiCMSService.GetPoemContent(poem)
    return <main>
        <Hero title={StrapiCMSService.GetPoemTitle(poem)}
            description={StrapiCMSService.GetPoemAuthor(poem)}
            cta={{ text: "Terug naar Poëzie", to: `/odes/${_category.slug}` }}
        />
        <DisplayContent>
            <Markdown>
                {_content}
            </Markdown>
        </DisplayContent>
    </main>
} 