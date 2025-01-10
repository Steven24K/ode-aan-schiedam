'use client'
import React, { ErrorInfo, ReactNode } from 'react'

type ErrorProps = {
    children?: React.ReactNode
}
type ErrorState = {
    hasError: boolean
    error?: Error
    info?: ErrorInfo
}

export default class ErrorBoundary extends React.Component<ErrorProps, ErrorState> {
    constructor(props: ErrorProps) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({ ...this.state, hasError: true, error: error, info: errorInfo })
    }

    render(): ReactNode {
        if (!this.state.hasError) return this.props.children
        return <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 p-4">
            <h1 className="text-4xl font-bold mb-4 text-red-800">Something went wrong</h1>
            {this.state.error && (
                <div className="bg-white m-4 p-4 rounded shadow-md">
                    <h2 className="text-2xl font-semibold mb-2">Error:</h2>
                    <div className="bg-red-200 p-2 rounded mb-4">
                        <p className="text-red-500">{this.state.error.toString()}</p>
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">Error Info:</h2>
                    <div className="bg-red-200 p-2 rounded mb-4 max-h-48 overflow-y-scroll">
                        <pre className="whitespace-pre-wrap text-red-500">{this.state.info?.componentStack}</pre>
                    </div>
                </div>
            )}
        </div>
    }
}