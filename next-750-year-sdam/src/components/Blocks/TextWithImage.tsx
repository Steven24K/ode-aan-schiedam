import { TextWithImageBlockProps } from "@/types/PageBlock";
import Image from "next/image";
import Markdown from "react-markdown";

export const TextWithImageBlock = (block: TextWithImageBlockProps) => {
    return <div key={block.id} className="lg:flex items-center my-4 gap-8">
        {block.Direction == 'Left' && <div className="lg:w-1/2">
            {block.Image && (
                <Image
                    src={`http://localhost:1337${block.Image.formats.large.url}`}
                    alt={block.Image.formats.large.name}
                    height={block.Image.formats.large.height}
                    width={block.Image.formats.large.width}
                />
            )}
        </div>}
        <div className="lg:w-1/2">
            {block.Title && <h2 className="text-2xl font-bold mb-2">{block.Title}</h2>}
            {block.Description && <Markdown className="text-base">{block.Description}</Markdown>}
        </div>
        {block.Direction == "Right" && <div className="lg:w-1/2">
            {block.Image && (
                <Image
                    src={`http://localhost:1337${block.Image.formats.large.url}`}
                    alt={block.Image.formats.large.name}
                    height={block.Image.formats.large.height}
                    width={block.Image.formats.large.width}
                />
            )}
        </div>}
    </div>
}