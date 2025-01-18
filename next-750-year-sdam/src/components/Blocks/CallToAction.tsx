import { CallToActionBlockProps } from "@/types/PageBlock"
import Image from "next/image"
import Link from "next/link"
import Markdown from "react-markdown"

export const CallToActionBlock = (block: CallToActionBlockProps) => {
    return <div key={block.id} className="cta-block my-2 border rounded-lg shadow-md text-center">
        {block.Image && (
            <Image
                src={`${block.Image.formats.large.url}`}
                alt={block.Image.formats.large.name}
                height={block.Image.formats.large.height}
                width={block.Image.formats.large.width}
                className="mb-4 mx-auto"
            />
        )}
        {block.Title && <h2 className="text-2xl font-bold mb-2">{block.Title}</h2>}
        {block.Description && <Markdown className="text-base">{block.Description}</Markdown>}
        <div className="actions flex justify-center gap-8">
            {block.Button && block.Button.map(btn => (
                <Link key={`cta_button_${btn.id}`} href={btn.URL}>
                    {btn.Title}
                </Link>
            ))}
        </div>
    </div>
}