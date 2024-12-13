import * as React from "react"

interface AppState {
}

interface AppProps {

}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
        this.state = {}
    }

    render(): React.ReactNode {
        return <div>
            <div className="bg-white">

                <div className="flex items-center justify-center h-screen bg-gray-50">
                    <div
                        className="flex flex-col items-center animate-fade-in opacity-0"
                        style={{ animation: "fadeIn 1.5s forwards" }}
                    >
                        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
                            750 odes aan Schiedam
                        </h1>
                        <img
                            alt="750 Schiedam Logo"
                            src="./wp-content/uploads/2024/12/cropped-750-schiedam-logo.png"
                            className="w-100 h-auto"
                        />
                        <button className="p-4 bg-yellow-500 hover:bg-yellow-700 ">Ontdek de verhalen</button>
                    </div>
                </div>


            </div>
        </div>
    }
}