import * as React from "react"
import { DataLoader, loadData, loading, unloaded } from "./types/DataLoader"
import { SiteInfo } from "./types/SiteInfo"
import { LoadData } from "./components/LoadData"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"

export interface AppState {
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
        
        return <RouterProvider router={router(this.state.siteInfo.v)} />
    }
}