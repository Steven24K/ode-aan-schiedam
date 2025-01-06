import { Block } from "@/types/StrapiHomePage"
import Image from "next/image"
import Link from "next/link"
import { use } from "react"

type DisplayContentProps = {
    blocks?: Promise<Block[]>
    children?: React.ReactNode
}
// Component responsible for displaying the content of the page from the CMS
export const DisplayContent = (props: DisplayContentProps) => {
    const { children, blocks } = props

    const _blocks = blocks ? use(blocks) : []

    return <div className="page-content container mx-auto my-2 p-5">

        {
            _blocks.map(block => <div key={block.id}>
                <h1>{block.Title}</h1>
                {block.Content && <p>{block.Content}</p>}
                {block.Image && <Image
                    src={`http://localhost:1337${block.Image.formats.large.url}`}
                    alt={block.Image.formats.large.name}
                    height={block.Image.formats.large.height}
                    width={block.Image.formats.large.width}
                />}
                {
                    block.Button &&
                    block.Button.map(btn => <Link key={btn.id} href={btn.URL}>{btn.Title}</Link>)
                }
            </div>)
        }

        {children}
    </div>
}