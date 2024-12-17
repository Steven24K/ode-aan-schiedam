import * as React from "react"
import { useParams } from "react-router-dom"
import { DisplayContentType } from "../components/DisplayContentType"
import { CustomRouteParams } from "../router"


export const DisplayWordPressPage = () => {
    const { slug } = useParams<CustomRouteParams>()
    return <DisplayContentType slug={slug || ""} content_type="pages" />
}