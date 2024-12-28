import * as React from "react"
import { DataLoader, loadData, loading, unloaded } from "./types/DataLoader"
import { SiteInfo } from "./types/SiteInfo"
import { LoadData } from "./components/LoadData"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { SplashScreen } from "./components/SplashScreen"

export interface AppState {
    siteInfo: DataLoader<SiteInfo>
    showSplash: boolean
}

interface AppProps {

}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = {
            siteInfo: unloaded(),
            showSplash: document.location.pathname == '/'
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

        if (this.state.showSplash) {
            return <SplashScreen
                siteInfo={this.state.siteInfo.v}
                unSplash={() => this.setState(s => ({ ...s, showSplash: false }))}
            />
        }

        return <RouterProvider router={router()} />
    }
}