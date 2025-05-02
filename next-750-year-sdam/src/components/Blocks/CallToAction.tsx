import { PageBlock } from "@/types/PageBlock"
import Image from "next/image"
import Link from "next/link"
import Markdown from "react-markdown"

export const CallToActionBlock = (block: PageBlock) => {
    if (block.__component !== 'blocks.call-to-action-cta') return <div>Block does not exist {JSON.stringify(block)}</div>
    
    return <div key={block.id} className={`cta-block my-2 border rounded-lg shadow-md text-center cta-bg--${block.Color}`}>
        {block.Image && (
            <Image
                src={`${block.Image.url}`}
                alt={block.Image.name}
                height={block.Image.height}
                width={block.Image.width}
                className="mb-4 mx-auto"
            />
        )}
        <div className="cta-content">
            {block.Title && <h2 className="text-2xl font-bold mb-2">{block.Title}</h2>}
            {block.Description && <Markdown className="text-base">{block.Description}</Markdown>}
            <div className="actions flex justify-center gap-4">
                {block.Button && block.Button.map(btn => (
                    <Link key={`cta_button_${btn.id}`} href={btn.URL}>
                        {btn.Title}
                    </Link>
                ))}
            </div>
        </div>
    </div>
}