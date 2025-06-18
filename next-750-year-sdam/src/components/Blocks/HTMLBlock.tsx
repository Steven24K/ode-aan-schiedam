import DOMPurify from "dompurify"
import { PageBlock } from "@/types/PageBlock"

export const HTMLBlock = (block: PageBlock) => {
    if (block.__component !== 'blocks.html-block') return <div>Block does not exist {JSON.stringify(block)}</div>

    const clean_html = DOMPurify.sanitize(block.Content);

    return <div
        key={block.id}
        className="overflow-hidden my-2"
        dangerouslySetInnerHTML={{ __html: clean_html }}
    />
}