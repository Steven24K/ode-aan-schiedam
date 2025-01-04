
type DisplayContentProps = {
    children?: React.ReactNode
}
// Component responsible for displaying the content of the page from the CMS
export const DisplayContent = (props: DisplayContentProps) => {
    const { children } = props
    return <div className="page-content container mx-auto my-2 p-5">
        {children}
    </div>
}