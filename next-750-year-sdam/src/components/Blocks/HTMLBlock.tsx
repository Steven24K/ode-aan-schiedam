import { PageBlock } from "@/types/PageBlock"

export const HTMLBlock = (block: PageBlock) => {
    if (block.__component !== 'blocks.html-block') return <div>Block does not exist {JSON.stringify(block)}</div>

    return <div
        key={block.id}
        className="overflow-hidden my-2"
        dangerouslySetInnerHTML={{ __html: block.Content }}
    />
}