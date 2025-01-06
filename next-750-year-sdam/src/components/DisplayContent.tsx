import { use } from "react"
import Markdown from 'react-markdown'
import Image from "next/image"
import Link from "next/link"
import { Block } from "@/types/StrapiHomePage"

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
            _blocks.map(block => {
                const id = block.id
                const type = block.Type
                const title = block.Title
                const Content = block.Content
                const BlockImage = block.Image
                const Actions = block.Button

                switch (type) {
                    case 'text':
                        return (
                            <div key={id} className="text-block my-4">
                                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                                {Content && <Markdown className="text-base">{Content}</Markdown>}
                            </div>
                        )
                    case 'text-image':
                        return (
                            <div key={id} className="image-block flex items-center my-4">
                                <div className="text w-1/2">
                                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                                    {Content && <Markdown className="text-base">{Content}</Markdown>}
                                </div>
                                <div className="image w-1/2">
                                    {BlockImage && (
                                        <Image
                                            src={`http://localhost:1337${BlockImage.formats.large.url}`}
                                            alt={BlockImage.formats.large.name}
                                            height={BlockImage.formats.large.height}
                                            width={BlockImage.formats.large.width}
                                        />
                                    )}
                                </div>
                            </div>
                        )
                    case 'cta':
                        return (
                            <div key={id} className="cta-block my-4 p-4 border rounded-lg shadow-md text-center">
                                {BlockImage && (
                                    <Image
                                        src={`http://localhost:1337${BlockImage.formats.large.url}`}
                                        alt={BlockImage.formats.large.name}
                                        height={BlockImage.formats.large.height}
                                        width={BlockImage.formats.large.width}
                                        className="mb-4 mx-auto"
                                    />
                                )}
                                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                                {Content && <Markdown className="text-base mb-4">{Content}</Markdown>}
                                <div className="actions">
                                    {Actions && Actions.map(btn => (
                                        <Link key={btn.id} href={btn.URL}>
                                            {btn.Title}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )
                    default:
                        return <div>Block does not exist {type}</div>
                }
            })
        }

        {children}
    </div>
}