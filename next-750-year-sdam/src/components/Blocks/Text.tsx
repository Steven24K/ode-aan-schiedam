import { TextBlockProps } from "@/types/PageBlock"
import Markdown from "react-markdown"

export const TextBlock = (block: TextBlockProps) => {
    return <div key={`${block.__component}_${block.id}`} className="text-block">
        {block.Title && <h2 className="text-2xl font-bold mb-2">{block.Title}</h2>}
        {block.Description && <Markdown className="text-base">{block.Description}</Markdown>}
    </div>
}