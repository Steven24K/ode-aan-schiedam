import * as React from "react"
import { useParams } from "react-router-dom"
import { DisplayPage } from "../components/DisplayPage"


export const DisplayWordPressPage = () => {
    const { slug } = useParams()
    return <DisplayPage slug={slug || ""} />
}