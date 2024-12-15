import { SiteInfo } from "../types/SiteInfo"

type SplashScreenProps = {
    siteInfo: SiteInfo
}

export const SplashScreen = (props: SplashScreenProps) => {
    const { siteInfo } = props
    return <div className="bg-white">
        <div className="flex items-center justify-center h-screen">
            <div
                className="flex flex-col items-center animate-fade-in opacity-0"
                style={{ animation: "fadeIn 1.5s forwards" }}
            >
                <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
                    {siteInfo.name}
                </h1>
                <img
                    alt="750 Schiedam Logo"
                    src={siteInfo.site_icon_url}
                    className="w-100 h-auto"
                />
                <button className="p-4 bg-yellow-500 hover:bg-yellow-700 ">
                    {siteInfo.description}
                </button>
            </div>
        </div>
    </div>
}