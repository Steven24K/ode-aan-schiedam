"use client"
import React, { useEffect } from "react"

type CounterProps = {
    count: number
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
    const count_up_to = props.count

    useEffect(() => {
        if (state.counter < count_up_to) {
            setTimeout(() => {
                let newCounter = state.counter + state.incrementor
                if (newCounter >= count_up_to) newCounter = count_up_to
                let newTimeout = state.timeout - 1
                if (newTimeout < 10) newTimeout = 10
                setState({
                    ...state,
                    counter: newCounter,
                    incrementor: state.incrementor + 1,
                    timeout: newTimeout
                })
            }, state.timeout)
        }
    }, [state.counter])

    return <>
        <span className="number">{state.counter}</span>
        {props.debug && <i className="text-xs">Incr: {state.incrementor}, time: {state.timeout}</i>}
    </>
}