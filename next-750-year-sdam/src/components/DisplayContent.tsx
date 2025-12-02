import { PageBlock } from "@/types/PageBlock"
import { TextBlock } from "./Blocks/Text"
import { TextWithImageBlock } from "./Blocks/TextWithImage"
import { CallToActionBlock } from "./Blocks/CallToAction"
import { FormBlock } from "./Blocks/FormBlock"
import { ImageBlock } from "./Blocks/ImageBlock"
import { ImageSlider } from "./Blocks/ImageSlider"
import { YouTubeVideoBlock } from "./Blocks/YouTubeVideo"
import { StoriesBlock } from "./Blocks/StoriesBlock"
import { PageProps } from "@/types/Params"
import { HTMLBlock } from "./Blocks/HTMLBlock"
import { StoryCounter } from "./Blocks/StoryCounter"
import { PodcastGrid } from "./PodcastGrid/PodcastGrid"
import { CategoriesBlock } from "./Blocks/CategoriesBlock"
import { PrintifyShopBlock } from "./Blocks/PrintifyShopBlock"
import { PaymentStatusBlock } from "./Blocks/PaymentStatusBlock"
import { InteractiveChat } from "./Blocks/InteractiveChat/InteractiveChat.server"

type DisplayContentProps = {
    className?: string
    blocks?: PageBlock[]
    children?: React.ReactNode
    childPositon?: 'top' | 'bottom'
    isHome?: true
    pageParams: PageProps
}


// Component responsible for displaying the content of the page from the CMS
export const DisplayContent = (props: DisplayContentProps) => {
    const { children, blocks, className, childPositon, pageParams, isHome } = props

    return <div className={`page-content container mx-auto ${className || ''} ${isHome ? 'home-container' : ''}`}>
        {childPositon == 'top' && children}
        {
            blocks && blocks.map(block => {
                switch (block.__component) {
                    case 'blocks.text':
                        return <TextBlock key={`${block.__component}_${block.id}`} {...block} pageParams={pageParams} />
                    case 'blocks.text-image':
                        return <TextWithImageBlock key={`${block.__component}_${block.id}`} {...block} pageParams={pageParams} />
                    case 'blocks.call-to-action-cta':
                        return <CallToActionBlock key={`${block.__component}_${block.id}`} {...block} pageParams={pageParams} />
                    case 'blocks.form':
                        return <FormBlock key={`${block.__component}_${block.id}`} {...block} pageParams={pageParams} />
                    case 'blocks.image':
                        return <ImageBlock key={`${block.__component}_${block.id}`} {...block} pageParams={pageParams} />
                    case 'blocks.image-slider':
                        return <ImageSlider key={`${block.__component}_${block.id}`} {...block} pageParams={pageParams} />
                    case 'blocks.you-tube-video':
                        return <YouTubeVideoBlock key={`${block.__component}_${block.id}`} {...block} pageParams={pageParams} />
                    case 'blocks.stories':
                        return <StoriesBlock key={`${block.__component}_${block.id}`} {...block} pageParams={pageParams} />
                    case 'blocks.html-block':
                        return <HTMLBlock key={`${block.__component}_${block.id}`} {...block} pageParams={pageParams} />
                    case 'blocks.poem-counter':
                        return <StoryCounter key={`${block.__component}_${block.id}`} {...block} pageParams={pageParams} />
                    case 'blocks.podcasts':
                        return <PodcastGrid key={`${block.__component}_${block.id}`} {...block} pageParams={pageParams} />
                    case 'blocks.categories':
                        return <CategoriesBlock key={`${block.__component}_${block.id}`} {...block} pageParams={pageParams} />
                    case 'blocks.printify-shop':
                        return <PrintifyShopBlock key={`${block.__component}_${block.id}`} {...block} pageParams={pageParams} />
                    case 'blocks.payment-status': 
                        return <PaymentStatusBlock key={`${block.__component}_${block.id}`} {...block} pageParams={pageParams} />
                    case 'blocks.interactive-chat':
                        return <InteractiveChat key={`${block.__component}_${block.id}`} {...block} pageParams={pageParams} />
                    default:
                        return <div key={JSON.stringify(block)}>Block does not exist {JSON.stringify(block)}</div>
                }
            })
        }
        {(childPositon == undefined || childPositon == 'bottom') && children}
    </div>
}