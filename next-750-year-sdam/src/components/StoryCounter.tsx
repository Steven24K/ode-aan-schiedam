import { use } from "react"

type CounterProps = {
    count: Promise<number>
}

export const StoryCounter = (props: CounterProps) => {
    const { count } = props
    const _count = use(count)

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
                <span className="number">{_count}</span>
                <span className="text">Odes</span>
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