import * as React from "react"
import { SplashScreen } from "../components/SplashScreen"
import { SiteInfo } from "../types/SiteInfo"
import { WordPressPage } from "../types/WordPressPage"
import { DataLoader, loadData, loading, unloaded } from "../types/DataLoader"
import { None, Option, Some } from "../types/Option"
import { LoadData } from "../components/LoadData"

type HomePageProps = {
    siteInfo: SiteInfo
}

type HomePageState = {
    splash: boolean
    pageData: DataLoader<Option<WordPressPage>>
}

const zeroHomePageState = (): HomePageState => ({
    splash: true,
    pageData: unloaded(),
})

export const HomePage = (props: HomePageProps) => {
    const { siteInfo } = props
    const [state, setState] = React.useState<HomePageState>(zeroHomePageState)

    if (state.splash) return <SplashScreen
        siteInfo={siteInfo}
        unSplash={() => setState(s => ({ ...s, splash: false }))}
    />

    if (state.pageData.kind == 'unloaded') {
        setState(s => ({
            ...s,
            pageData: loading(loadData<Option<WordPressPage>>(`/wp-json/wp/v2/pages/?slug=homepage`, {
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

    const homepage = state.pageData.v.v
    return <div className="container">
        <section className="row">
            <div className="col-12">
                <h1 className="flex-center">{homepage.title.rendered}</h1>
                <p dangerouslySetInnerHTML={{ __html: homepage.content.rendered }}></p>
            </div>
        </section>

        <section className="section flex flex-center flex-column">
            <h2 className="section-title">Poëzie</h2>
            <ul className="section-list">
                <li>Een mooie nacht</li>
                <li>De beste dag</li>
                <li>Liefdesgedicht</li>
            </ul>
            <button className="section-button">Bekijk alle verhalen</button>
        </section>

        <section className="section flex flex-center flex-column">
            <h2 className="section-title">Liefde</h2>
            <ul className="section-list">
                <li>De eerste kus</li>
                <li>In het café</li>
                <li>Op het eerste gezicht</li>
            </ul>
            <button className="section-button">Bekijk alle verhalen</button>
        </section>

        <section className="section flex flex-center flex-column">
            <h2 className="section-title">Uit de stad</h2>
            <ul className="section-list">
                <li>Mijn favoriete plek</li>
                <li>Mijn eerste huis</li>
            </ul>
            <button className="section-button">Bekijk alle verhalen</button>
        </section>

        <section className="section flex flex-center flex-column">
            <h2 className="section-title">Vriendschap</h2>
            <ul className="section-list">
                <li>Deze is voor...</li>
            </ul>
            <button className="section-button">Bekijk alle verhalen</button>
        </section>

    </div>
}