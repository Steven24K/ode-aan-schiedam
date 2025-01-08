import { use } from "react"
import Markdown from 'react-markdown'
import Image from "next/image"
import Link from "next/link"
import { PageBlock } from "@/types/PageBlock"

type DisplayContentProps = {
    blocks?: Promise<PageBlock[]>
    children?: React.ReactNode
}



// Component responsible for displaying the content of the page from the CMS
export const DisplayContent = (props: DisplayContentProps) => {
    const { children, blocks } = props

    const _blocks = blocks ? use(blocks) : []

    return <div className="page-content container mx-auto my-2 p-5">

        {
            _blocks.map(block => {
                switch (block.__component) {
                    case 'blocks.text':
                        return (
                            <div key={`${block.__component}_${block.id}`} className="text-block my-4">
                                {block.Title && <h2 className="text-2xl font-bold mb-2">{block.Title}</h2>}
                                {block.Description && <Markdown className="text-base">{block.Description}</Markdown>}
                            </div>
                        )
                    case 'blocks.text-image':
                        return (
                            <div key={block.id} className="image-block flex items-center my-4">
                                <div className="text w-1/2">
                                    {block.Title && <h2 className="text-2xl font-bold mb-2">{block.Title}</h2>}
                                    {block.Description && <Markdown className="text-base">{block.Description}</Markdown>}
                                </div>
                                <div className="image w-1/2">
                                    {block.Image && (
                                        <Image
                                            src={`http://localhost:1337${block.Image.formats.large.url}`}
                                            alt={block.Image.formats.large.name}
                                            height={block.Image.formats.large.height}
                                            width={block.Image.formats.large.width}
                                        />
                                    )}
                                </div>
                            </div>
                        )
                    case 'blocks.call-to-action-cta':
                        return (
                            <div key={block.id} className="cta-block my-4 p-4 border rounded-lg shadow-md text-center">
                                {block.Image && (
                                    <Image
                                        src={`http://localhost:1337${block.Image.formats.large.url}`}
                                        alt={block.Image.formats.large.name}
                                        height={block.Image.formats.large.height}
                                        width={block.Image.formats.large.width}
                                        className="mb-4 mx-auto"
                                    />
                                )}
                                {block.Title && <h2 className="text-2xl font-bold mb-2">{block.Title}</h2>}
                                {block.Description && <Markdown className="text-base mb-4">{block.Description}</Markdown>}
                                <div className="actions">
                                    {block.Button && block.Button.map(btn => (
                                        <Link key={`cta_button_${btn.id}`} href={btn.URL}>
                                            {btn.Title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )
                    default:
                        return <div>Block does not exist</div>
                }
            })
        }

        {children}
    </div>
}