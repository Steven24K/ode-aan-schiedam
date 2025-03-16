import { TextWithImageBlockProps } from "@/types/PageBlock";
import Image from "next/image";
import Markdown from "react-markdown";

export const TextWithImageBlock = (block: TextWithImageBlockProps) => {
    return <div key={block.id} className={`lg:flex items-center my-4 gap-8 ${block.Direction == 'Right' ? 'mirror' : ''}`}>
        {block.Image && (
            <div className="lg:w-1/2">
                <Image
                    src={`${block.Image.url}`}
                    alt={block.Image.name}
                    height={block.Image.height}
                    width={block.Image.width}
                />
            </div>
        )}
        <div className="lg:w-1/2 text-left">
            {block.Title && <h2 className="text-2xl font-bold mb-2">{block.Title}</h2>}
            {block.Description && <Markdown className="text-base">{block.Description}</Markdown>}
        </div>
    </div>
}