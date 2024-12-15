import { SiteInfo } from "../types/SiteInfo"

type SplashScreenProps = {
    siteInfo: SiteInfo
    unSplash: () => void
}

export const SplashScreen = (props: SplashScreenProps) => {
    const { siteInfo, unSplash } = props;
    return (
        <div className="splash-screen">
            <div className="splash-content">
                <h1 className="splash-title">{siteInfo.name}</h1>
                <img
                    alt="750 Schiedam Logo"
                    src={siteInfo.site_icon_url}
                    className="splash-logo"
                />
                <button onClick={unSplash} className="splash-button">{siteInfo.description}</button>
            </div>
        </div>
    );
};
