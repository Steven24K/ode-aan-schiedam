import { use } from "react"

type DisplayContentProps = {
    content?: Promise<string>
    children?: React.ReactNode
}
// Component responsible for displaying the content of the page from the CMS
export const DisplayContent = (props: DisplayContentProps) => {
    const { children, content } = props

    return <div className="page-content container mx-auto my-2 p-5">
        {content && <p dangerouslySetInnerHTML={{ __html: use(content) }} />}
        {children}
    </div>
}