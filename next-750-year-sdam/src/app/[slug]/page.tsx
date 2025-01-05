import { DisplayContent } from "@/components/DisplayContent";
import { Hero } from "@/components/Hero";
import { Params } from "@/types/Params";

type PageProps = {
    params: Promise<Partial<Params>>
}

export default async function CMSPage(props: PageProps) {
    const { params } = props
    const { slug } = await params
    if (!slug) return <div>Page not found</div>

    return <main>
        <Hero title={Promise.resolve("CMS content page")} />
        
        <DisplayContent>
            <h1>This is supposed to be a page from the cms</h1>
            <p>
                Lorum ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
            </p>
        </DisplayContent>
    </main>
}