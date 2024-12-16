import * as React from "react"
import { SplashScreen } from "../components/SplashScreen"
import { SiteInfo } from "../types/SiteInfo"
import { DisplayPage } from "../components/DisplayPage"

type HomePageProps = {
    siteInfo: SiteInfo
}

type HomePageState = {
    splash: boolean
}

const zeroHomePageState = (): HomePageState => ({
    splash: true,
})

export const HomePage = (props: HomePageProps) => {
    const { siteInfo } = props
    const [state, setState] = React.useState<HomePageState>(zeroHomePageState)

    if (state.splash) return <SplashScreen
        siteInfo={siteInfo}
        unSplash={() => setState(s => ({ ...s, splash: false }))}
    />


    return <DisplayPage slug="homepage">
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
    </DisplayPage>
}