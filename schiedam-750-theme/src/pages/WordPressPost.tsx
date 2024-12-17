import { useParams } from "react-router-dom"
import { DisplayContentType } from "../components/DisplayContentType"
import { CustomRouteParams } from "../router"

export const DisplayWordPressPost = () => {
    const { slug } = useParams<CustomRouteParams>()
    return <DisplayContentType slug={slug || ""} content_type="posts" />
}