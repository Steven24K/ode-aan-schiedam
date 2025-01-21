import { DisplayContent } from "@/components/DisplayContent"
import { Hero } from "@/components/Hero"
import { SocialButtons } from "@/components/SocialButtons"
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
    const _poem = await poem

    const title = poem.then(p => p.Title)
    const author = poem.then(p => p.Author)
    const _category = _poem.category
    const _content = _poem.Content
    return <>
        <Hero title={title}
            description={author}
            color={_category.Color}
            cta={{ text: `Terug naar ${_category.Title}`, to: `/odes/${_category.slug}` }}
        />
        <DisplayContent className="flex justify-center">
            <div className="poem">
                <Markdown className="text-base">
                    {_content}
                </Markdown>
            </div>
            <SocialButtons />
        </DisplayContent>
    </>
} 