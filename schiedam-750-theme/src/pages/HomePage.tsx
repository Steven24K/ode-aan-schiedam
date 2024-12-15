import * as React from "react"
import { SplashScreen } from "../components/SplashScreen"
import { SiteInfo } from "../types/SiteInfo"

type HomePageProps = {
    siteInfo: SiteInfo

}

export const HomePage = (props: HomePageProps) => {
    const { siteInfo } = props

    return <div>
        <SplashScreen siteInfo={siteInfo} />
        
    </div>
}