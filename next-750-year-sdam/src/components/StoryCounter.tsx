import { StrapiCMSService } from "@/services/StrapiCMSService"
import { Suspense } from "react"
import { CounterAnimation } from "./CounterAnimation"



export const StoryCounter = () => {
    const strapi = new StrapiCMSService()

    const poem_count = strapi.getPoemCounter()

    return <div className="counter">
        <div className="diamond-wrapper">
            <div className="diamond-purple"></div>
            <div className="diamond-yellow"></div>
            <div className="diamond-green"></div>
            <div className="diamond-blue"></div>
            <div className="diamond-orange"></div>
            <div className="diamond-red"></div>
        </div>
        <div className="diamond-counter">
            <div className="counter-content">
                <span className="text">Verzamelde</span>
                <Suspense fallback={<span className="number">0</span>}>
                    <CounterAnimation count={poem_count}/>
                </Suspense>
                <span className="text">Verhalen</span>
            </div>
        </div>
        <div className="diamond-wrapper">
            <div className="diamond-red"></div>
            <div className="diamond-orange"></div>
            <div className="diamond-blue"></div>
            <div className="diamond-green"></div>
            <div className="diamond-yellow"></div>
            <div className="diamond-purple"></div>
        </div>
    </div>
}


