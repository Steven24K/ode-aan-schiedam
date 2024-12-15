import * as React from "react"
import { DataLoader, loadData, loading, unloaded } from "../types/DataLoader"
import { None, Option, Some } from "../types/Option"
import { WordPressPage } from "../types/WordPressPage"
import { useParams } from "react-router-dom"
import { LoadData } from "../components/LoadData"

type WordPressPageState = {
    pageData: DataLoader<Option<WordPressPage>>
}

const zeroWordPressPageState = (): WordPressPageState => ({
    pageData: unloaded(),
})

export const DisplayWordPressPage = () => {
    const [state, setState] = React.useState(zeroWordPressPageState)
    const { slug } = useParams()

    if (state.pageData.kind == 'unloaded') {
        setState(s => ({
            ...s,
            pageData: loading(loadData<Option<WordPressPage>>(`/wp-json/wp/v2/pages/?slug=${slug}`, {
                parser: json => json.length > 0 ? Some(json[0]) : None()
            }))
        }))
    }

    if (state.pageData.kind != 'loaded') {
        return <LoadData
            loader={state.pageData}
            updater={data => setState(s => ({ ...s, pageData: data }))}
        />
    }

    if (state.pageData.v.kind == 'none') return <div>Not found</div>

    const page = state.pageData.v.v

    return <div className="container">
        <section className="row">
            <div className="col-12">
                <h1 className="flex-center">{page.title.rendered}</h1>
                <p dangerouslySetInnerHTML={{ __html: page.content.rendered }}></p>
            </div>
        </section>
    </div>
}