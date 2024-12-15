import * as React from "react"
import { DataLoader, loadData, loading, unloaded } from "./types/DataLoader"
import { SiteInfo } from "./types/SiteInfo"
import { LoadData } from "./components/LoadData"

interface AppState {
    siteInfo: DataLoader<SiteInfo>
}

interface AppProps {

}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = {
            siteInfo: unloaded()
        }
    }

    componentDidMount(): void {
        if (this.state.siteInfo.kind == 'unloaded')
            this.setState(s => ({ ...s, siteInfo: loading(loadData<SiteInfo>(`/wp-json/`)) }))
    }

    render(): React.ReactNode {
        if (this.state.siteInfo.kind != 'loaded') {
            return <LoadData
                loader={this.state.siteInfo}
                updater={data => this.setState(s => ({ ...s, siteInfo: data }))}
            />
        }

        const siteInfo = this.state.siteInfo.v

        return <div>
            <div className="bg-white">

                <div className="flex items-center justify-center h-screen bg-white-50">
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
        </div>
    }
}