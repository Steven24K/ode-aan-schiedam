import { PageBlock } from "@/types/PageBlock"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"

export const RichTextBlock = (block: PageBlock) => {
    if (block.__component !== 'blocks.rich-text') return <div>Block does not exist {JSON.stringify(block)}</div>

    return <>
        {block.Title && <h2 className="text-2xl font-bold mb-2">{block.Title}</h2>}
        <div key={`${block.__component}_${block.id}`} className="text-block text-base py-2">
            {block.Content && <BlocksRenderer content={block.Content} />}
        </div>
    </>
}