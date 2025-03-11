import { PageBlock } from "@/types/PageBlock"
import { TextBlock } from "./Blocks/Text"
import { TextWithImageBlock } from "./Blocks/TextWithImage"
import { CallToActionBlock } from "./Blocks/CallToAction"
import { FormBlock } from "./Blocks/FormBlock"

type DisplayContentProps = {
    className?: string
    blocks?: PageBlock[]
    children?: React.ReactNode
    childPositon?: 'top' | 'bottom'
}



// Component responsible for displaying the content of the page from the CMS
export const DisplayContent = (props: DisplayContentProps) => {
    const { children, blocks, className, childPositon } = props



    return <div className={`page-content container mx-auto p-5 ${className || ''}`}>
        {childPositon == 'top' && children}
        {
            blocks && blocks.map(block => {
                switch (block.__component) {
                    case 'blocks.text':
                        return <TextBlock key={`${block.__component}_${block.id}`} {...block} />
                    case 'blocks.text-image':
                        return <TextWithImageBlock key={`${block.__component}_${block.id}`} {...block} />
                    case 'blocks.call-to-action-cta':
                        return <CallToActionBlock key={`${block.__component}_${block.id}`} {...block} />
                    case 'blocks.form':
                        return <FormBlock key={`${block.__component}_${block.id}`} {...block} />
                    default:
                        return <div key={JSON.stringify(block)}>Block does not exist {JSON.stringify(block)}</div>
                }
            })
        }
        {(childPositon == undefined || childPositon == 'bottom') && children}
    </div>
}