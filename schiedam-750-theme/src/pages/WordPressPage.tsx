import * as React from "react"
import { useParams } from "react-router-dom"
import { DisplayPage } from "../components/DisplayPage"
import { CustomRouteParams } from "../router"


export const DisplayWordPressPage = () => {
    const { slug } = useParams<CustomRouteParams>()
    return <DisplayPage slug={slug || ""} />
}