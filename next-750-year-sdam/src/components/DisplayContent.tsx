import { PageBlock, PageBlockComponent } from "@/types/PageBlock"
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
import { RichTextBlock } from "./Blocks/RichText"
import { LatestPostsBlock } from "./Blocks/LatestPosts/LatestPosts.server"
import { PoemSliderBlock } from "./Blocks/PoemSlider/PoemSlider.server"

type DisplayContentProps = {
    className?: string
    blocks?: PageBlock[]
    children?: React.ReactNode
    childPositon?: 'top' | 'bottom'
    isHome?: true
    pageParams: PageProps
}

const BLOCK_COMPONENTS: PageBlockComponent = {
    'blocks.text': TextBlock,
    'blocks.text-image': TextWithImageBlock,
    'blocks.call-to-action-cta': CallToActionBlock,
    'blocks.form': FormBlock,
    'blocks.image': ImageBlock,
    'blocks.image-slider': ImageSlider,
    'blocks.you-tube-video': YouTubeVideoBlock,
    'blocks.stories': StoriesBlock,
    'blocks.html-block': HTMLBlock,
    'blocks.poem-counter': StoryCounter,
    'blocks.podcasts': PodcastGrid,
    'blocks.categories': CategoriesBlock,
    'blocks.printify-shop': PrintifyShopBlock,
    'blocks.payment-status': PaymentStatusBlock,
    'blocks.rich-text': RichTextBlock,
    "blocks.latest-post": LatestPostsBlock,
    "blocks.poem-slider": PoemSliderBlock
}

const BlockRenderer = (pageParams: PageProps) => (block: PageBlock) => {
    const Component = BLOCK_COMPONENTS[block.__component] as React.ComponentType<any>;
    if (!Component) return <div key={JSON.stringify(block)}>Block does not exist {JSON.stringify(block)}</div>
    return <Component key={`${block.__component}_${block.id}`} {...block} pageParams={pageParams} />
}

// Component responsible for displaying the content of the page from the CMS
export const DisplayContent = (props: DisplayContentProps) => {
    const { children, blocks, className, childPositon, pageParams, isHome } = props

    return <div className={`page-content container mx-auto ${className || ''} ${isHome ? 'home-container' : ''}`}>
        {childPositon == 'top' && children}
        {blocks && blocks.map(BlockRenderer(pageParams))}
        {(childPositon == undefined || childPositon == 'bottom') && children}
    </div>
}