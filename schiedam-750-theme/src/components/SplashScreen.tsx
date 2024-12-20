import React from "react"
import { SiteInfo } from "../types/SiteInfo"

type SplashScreenProps = {
    siteInfo: SiteInfo
    unSplash: () => void
}

type SplashState = {
    animate: boolean
}

export const SplashScreen = (props: SplashScreenProps) => {
    const { siteInfo, unSplash } = props;
    const [state, setState] = React.useState<SplashState>({ animate: false })

    return <div className={`${state.animate ? 'curtain-up' : 'splash-screen'}`}
        onAnimationEnd={() => {
            if (state.animate) {
                unSplash()
            }
        }}
    >
        <div className={`splash-content ${state.animate ? 'grow-splash' : ''}`}>
            <h1 className="splash-title">{siteInfo.name}</h1>
            <img
                alt="750 Schiedam Logo"
                src={siteInfo.site_icon_url}
                className="splash-logo"
            />
            <button onClick={() =>
                setState(s => ({ ...s, animate: true }))
            } className="splash-button">
                {siteInfo.description}
            </button>
        </div>
    </div>
};
