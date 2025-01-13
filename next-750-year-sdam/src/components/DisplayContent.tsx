import { use } from "react"
import { PageBlock } from "@/types/PageBlock"
import { TextBlock } from "./Blocks/Text"
import { TextWithImageBlock } from "./Blocks/TextWithImage"
import { CallToActionBlock } from "./Blocks/CallToAction"

type DisplayContentProps = {
    blocks?: Promise<PageBlock[]>
    children?: React.ReactNode
}



// Component responsible for displaying the content of the page from the CMS
export const DisplayContent = (props: DisplayContentProps) => {
    const { children, blocks } = props

    const _blocks = blocks ? use(blocks) : []

    return <div className="page-content container mx-auto m-10 p-10">

        {
            _blocks.map(block => {
                switch (block.__component) {
                    case 'blocks.text':
                        return <TextBlock key={`${block.__component}_${block.id}`} {...block} />
                    case 'blocks.text-image':
                        return <TextWithImageBlock key={`${block.__component}_${block.id}`} {...block} />
                    case 'blocks.call-to-action-cta':
                        return <CallToActionBlock key={`${block.__component}_${block.id}`} {...block} />
                    default:
                        return <div>Block does not exist</div>
                }
            })
        }

        {children}
    </div>
}