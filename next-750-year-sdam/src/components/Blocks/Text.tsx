import { PageBlock} from "@/types/PageBlock"
import Markdown from "react-markdown"

export const TextBlock = (block: PageBlock) => {
    if (block.__component !== 'blocks.text') return <div>Block does not exist {JSON.stringify(block)}</div>
    
    return <div key={`${block.__component}_${block.id}`} className="text-block">
        {block.Title && <h2 className="text-2xl font-bold mb-2">{block.Title}</h2>}
        {block.Description && <Markdown className="text-base">{block.Description}</Markdown>}
    </div>
}