"use client"
import React, { use, useEffect } from "react"

type CounterProps = {
    count: Promise<number>
    debug?: true
}

type CounterState = {
    counter: number
    incrementor: number
    timeout: number
}

export const CounterAnimation = (props: CounterProps) => {
    const [state, setState] = React.useState<CounterState>({
        counter: 0,
        incrementor: 1,
        timeout: 50
    })
    const count_up_to = use(props.count)

    useEffect(() => {
        if (state.counter < count_up_to) {
            setTimeout(() => {
                let newCounter = state.counter + state.incrementor
                if (newCounter >= count_up_to) newCounter = count_up_to
                setState({
                    ...state,
                    counter: newCounter,
                    incrementor: state.incrementor + 1,
                    timeout: state.timeout - 1
                })
            }, state.timeout)
        }
    }, [state.counter])

    return <>
        <span className="number">{state.counter}</span>
        {props.debug && <i className="text-xs">Incr: {state.incrementor}, time: {state.timeout}</i>}
    </>
}