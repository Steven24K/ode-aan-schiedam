import DOMPurify from "dompurify"
import { PageBlock } from "@/types/PageBlock"

export const HTMLBlock = (block: PageBlock) => {
    if (block.__component !== 'blocks.html-block') return <div>Block does not exist {JSON.stringify(block)}</div>

    const clean_html = DOMPurify.sanitize(block.Content);

    return <div
        key={block.id}
        className="relative overflow-hidden w-full aspect-16/9 my-2"
    >
        <div
            className="absolute top-0 left-0 bottom-0 right-0 w-full h-full"
            dangerouslySetInnerHTML={{ __html: clean_html }}
        />
    </div>
}