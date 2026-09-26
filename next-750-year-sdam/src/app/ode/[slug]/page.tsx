import { DisplayContent } from "@/components/DisplayContent"
import { Hero } from "@/components/Hero"
import { SocialButtons } from "@/components/SocialButtons"
import { StrapiCMSService } from "@/services/StrapiCMSService"
import { PageProps } from "@/types/Params"
import Link from "next/link"
import { notFound } from "next/navigation"
import Markdown from "react-markdown"

export async function generateMetadata(props: PageProps) {
    const { params } = props
    const { slug } = await params

    const strapi = new StrapiCMSService()
    const page = await strapi.GetPoem(slug || 'null')
    
    return {
        title: (page.kind == 'ok' ? page.data.Title : 'Niet gevonden'),
        description: page.kind == 'ok' ? page.data.Content : '',
    }
}

export default async function StoryPage(props: PageProps) {
    const { params } = props
    const { slug } = await params

    const strapi = new StrapiCMSService()
    const poem = await strapi.GetPoem(slug || 'null')

    if (poem.kind == 'error') return notFound()

    const title = poem.data.Title
    const author = poem.data.Author

    const category = poem.data.category
    const content = poem.data.Content
    const blocks = poem.data.Blocks

    return <>
        <Hero title={title}
            description={author}
            color={category.Color}
            cta={{ text: `Terug naar ${category.Title}`, to: `/odes/${category.slug}` }}
        />
        <DisplayContent blocks={blocks} childPositon="top" pageParams={props}>
            <section className="flex justify-center">
                <div className="poem">
                    <Markdown className="text-base">
                        {content}
                    </Markdown>
                </div>
            </section>
        </DisplayContent>

        <DisplayContent pageParams={props}>
            <section>
                <h2 className="text-2xl">Deel deze ode:</h2>
                <SocialButtons />
            </section>
            <section className="grid">
                <div className="grid__item_wrapper">
                    <Link href={`/willekeurig?current=${slug}`}>
                        <div className="grid__item--random">
                            <h1>Willekeurige Ode</h1>
                        </div>
                    </Link>
                </div>
            </section>
        </DisplayContent>


    </>
} 