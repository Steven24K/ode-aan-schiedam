import { PageBlock } from "@/types/PageBlock"
import { InteractiveChatWidget } from "./InteractiveChat.client"

export const InteractiveChat: React.FC<PageBlock> = (props) =>
    props.__component !== 'blocks.interactive-chat' ? <div>Block does not exist {JSON.stringify(props)}</div> : <InteractiveChatWidget />
