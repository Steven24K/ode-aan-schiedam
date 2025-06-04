'use client'
import React, { ErrorInfo, ReactNode } from 'react'
import { Hero } from '../Hero'

type ErrorBoundaryProps = {
    dev?: true
    fallBack: React.ReactNode
    children?: React.ReactNode
}
type ErrorBoundaryState = {
    hasError: boolean
    showError: boolean
    error?: Error
    errorInfo?: ErrorInfo
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, showError: props.dev ?? false }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({ ...this.state, hasError: true, error: error, errorInfo: errorInfo })
    }

    render(): ReactNode {
        if (!this.state.hasError) return this.props.children
        return <>
            <Hero title='Error'
                description='Er is iets mis gegaan met het laden van de pagina. Probeer het later opnieuw of neem contact op met de beheerder van de website.'
                color='fiery-red'
                cta={{ text: 'Terug naar home', to: '/' }}
            />
            <div className='mx-8 bg-gray-100 min-h-screen'>
                <div className=''>
                    <div className='bg-gray-200 my-5 p-4 rounded-md'>
                        <h1 className='text-2xl'>An unexpected error occured</h1>
                        <div className='m-2 bg-red-200 text-red-900 border-l-4 border-red-500 p-2'><b>{this.state.error?.name}: </b>{this.state.error?.message}</div>
                        <pre className='whitespace-pre-wrap bg-gray-900 text-white m-2 p-5 max-h-60 overflow-y-auto rounded-lg'>{this.state.error?.stack}</pre>
                    </div>
                    <div className='bg-gray-200 p-4 rounded-md overflow-x-auto'>
                        <h2 className='text-2xl'>Component Stack</h2>
                        <pre className='whitespace-pre-wrap bg-gray-900 text-white m-2 p-5 max-h-60 overflow-y-auto rounded-lg'>{this.state.errorInfo?.componentStack}</pre>
                    </div>
                </div>
            </div>
        </>

    }
}