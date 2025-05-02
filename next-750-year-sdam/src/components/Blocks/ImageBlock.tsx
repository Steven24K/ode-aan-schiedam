import { PageBlock } from "@/types/PageBlock"
import Image from "next/image"

export const ImageBlock = (props: PageBlock) => {
    if (props.__component !== 'blocks.image') return <div>Block does not exist {JSON.stringify(props)}</div>
    
    const { Caption, Media } = props
    return <div className="image-block">
        <Image src={Media.url}
            alt={Media.name}
            height={Media.height}
            width={Media.width}
        />
        {Caption && <figcaption>{Caption}</figcaption>}
    </div>
}