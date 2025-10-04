"use client"
import { ShoppingCartContext, ShoppingCartDispatchContext, ShoppingCartStorage } from "@/contexts/ShoppingCartContext"
import React, { useContext, useEffect } from "react"
import { FormBuilder } from "./FormBuilder"
import { MolliePaymentMethodList, MolliePaymentResponse } from "@/services/MolliePaymentService"
import { ApiError, ApiResult, OkResult } from "@/types/StrapiData"
import { SiteInfo } from "@/types/SiteInfo"
import { setCookie_clientside } from "@/utils"

interface ShoppingCartState {
    checkout: 'idle' | 'form' | 'processing' | 'success' | 'error'
    paymentMethods: ApiResult<MolliePaymentMethodList> | 'unloaded'
    formState: CheckoutFormState
    paymentLink?: string
}

export interface CheckoutFormState {
    name: string
    surname: string
    email: string
    phone?: string
    country: string
    address: string
    city: string
    postalcode: string
    payment_method: string
}

const defaultCheckoutFormState: CheckoutFormState = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    country: 'NL',
    address: '',
    city: '',
    postalcode: '',
    payment_method: 'ideal'
}

const getMolliePaymentMethodsProxy = (): Promise<ApiResult<MolliePaymentMethodList>> => fetch('/api/getPaymentMethods')
    .then(res => {
        if (!res.ok) return ApiError('Failed to fetch payment methods')
        return res.json()
    })
    .then(data => OkResult(data as MolliePaymentMethodList))
    .catch(() => ApiError('Failed to fetch payment methods'))

const SubmitOrder = (formState: CheckoutFormState, cart: ShoppingCartStorage, redirectUrl: string, cancelUrl: string): Promise<ApiResult<MolliePaymentResponse>> =>
    fetch('/api/createOrder', { method: 'POST', body: JSON.stringify({ formState, cart: Array.from(cart.entries()), origin: window.location.origin, redirectUrl, cancelUrl }) })
        .then(res => {
            if (!res.ok) return ApiError('Failed to create order')
            return res.json()
        })
        .then(data => OkResult(data))
        .catch(() => ApiError('Failed to create order'))

interface ShoppingCartProps {
    siteInfo: ApiResult<SiteInfo>
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ siteInfo }) => {
    if (siteInfo.kind != 'ok') return <div className="text-red-500 p-4">Error loading site info: {siteInfo.error}</div>
    const { CheckoutCancel, CheckoutRedirect } = siteInfo.data

    const context = useContext(ShoppingCartContext)
    const dispatch = useContext(ShoppingCartDispatchContext)

    const toggleSideBar = () => dispatch(['sidebar', context.sidebar == 'open' ? 'closed' : 'open'])

    const [state, setState] = React.useState<ShoppingCartState>({ checkout: 'idle', paymentMethods: 'unloaded', formState: defaultCheckoutFormState })

    useEffect(() => {
        if (context.sidebar == 'closed') {
            setState(s => ({ ...s, checkout: 'idle' }))
        }
    }, [context.sidebar])

    useEffect(() => {
        if (state.paymentMethods === 'unloaded') {
            getMolliePaymentMethodsProxy().then(r => setState(s => ({ ...s, paymentMethods: r })))
        }
    }, [state.paymentMethods])

    useEffect(() => {
        if (state.checkout === 'processing') {
            SubmitOrder(state.formState, context.storage, CheckoutRedirect.slug, CheckoutCancel.slug)
                .then(res => {
                    if (res.kind === 'ok') {
                        if (res.data && res.data._links && res.data._links.checkout) {
                            setState(s => ({ ...s, checkout: 'success' }))
                            setCookie_clientside('paymentId', res.data.id, 1)
                            window.location.href = res.data._links.checkout.href
                        } else {
                            setState(s => ({ ...s, checkout: 'error' }))
                        }
                    }
                })
        }
    }, [state.checkout])


    let _paymentMethods: ApiResult<MolliePaymentMethodList> = ApiError('Unloaded')
    if (state.paymentMethods !== 'unloaded') {
        _paymentMethods = state.paymentMethods
    }

    return <div
        className={`fixed top-0 left-0 h-full w-96 bg-white shadow-lg z-50 flex flex-col transition-transform duration-300 ${context.sidebar === 'open' ? 'translate-x-0' : '-translate-x-full'}`}
    >
        <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold">Winkelwagen</h2>
            <button className="text-gray-500 hover:text-gray-700" aria-label="Close cart" onClick={toggleSideBar}>
                &times;
            </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Example product item */}

            {context.storage.size === 0 && <div className="text-center text-gray-500">Je winkelwagen is nog leeg.</div>}

            {
                Array.from(context.storage.values()).map(cartItem => {
                    return <div key={cartItem.variantId} className="flex items-center justify-between gap-2 border-b pb-2">
                        <div>
                            <div className="font-semibold">{cartItem.label}</div>
                            <div className="text-sm text-gray-500">{cartItem.variantLabel}</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                className="w-12 border rounded px-2 py-1 text-center"
                                type="number"
                                min={1}
                                value={cartItem.quantity}
                                onChange={e => {
                                    const quantity = Math.max(1, parseInt(e.target.value) || 1)
                                    const updatedProduct = { ...cartItem, quantity }
                                    dispatch(['storage', context.storage.set(cartItem.variantId.toString(), updatedProduct)])
                                }}
                            />
                            <div className="text-sm">x €{(cartItem.pricePerUnit / 100).toFixed(2)}</div>
                            <div className="font-bold ml-2">€{(cartItem.pricePerUnit * cartItem.quantity / 100).toFixed(2)}</div>
                        </div>
                        <button
                            className="ml-2 text-red-500 hover:text-red-700 text-xs px-1 py-1 rounded border border-red-200"
                            aria-label="Remove item"
                            onClick={() => {
                                context.storage.delete(cartItem.variantId.toString())
                                if (context.storage.size === 0) {
                                    setState(s => ({ ...s, checkout: 'idle' }))
                                }
                                dispatch(['storage', context.storage])
                            }}
                        >
                            X
                        </button>
                    </div>
                })
            }

            {state.checkout == 'form' && <FormBuilder<CheckoutFormState>
                defaultObject={state.formState}
                fields={[
                    { name: 'name', label: 'Voornaam', kind: 'text', weight: 1, required: true },
                    { name: 'surname', label: 'Achternaam', kind: 'text', weight: 10, required: true },
                    { name: 'email', label: 'Email', kind: 'email', weight: 20, required: true },
                    { name: 'phone', label: 'Tel.', kind: 'text', weight: 30, required: false },
                    { name: 'country', label: 'Land', kind: 'dropdown', weight: 40, required: true, options: [{ name: 'Nederland', value: 'NL' }, { name: 'België', value: 'BE' }] },
                    { name: 'address', label: 'Addres', kind: 'text', weight: 50, required: true },
                    { name: 'city', label: 'Stad', kind: 'text', weight: 70, required: true },
                    { name: 'postalcode', label: 'Postcode', kind: 'text', weight: 80, required: true },
                    {
                        name: 'payment_method',
                        label: 'Payment Method',
                        kind: 'dropdown',
                        weight: 90, required: true,
                        options: _paymentMethods.kind === 'ok' ? _paymentMethods.data._embedded.methods.map(m => ({ name: m.description, value: m.id })) : []
                    }
                ]}
                handleChange={(key, value) => setState(s => ({ ...s, formState: { ...s.formState, [key]: value } }))}
                handleSubmit={() => setState(s => ({ ...s, checkout: 'processing' }))}
                submitText="Betalen"
            />}

            {state.checkout == 'processing' && <div className="text-center text-blue-500 font-semibold">Bestelling aan het verwerken...</div>}

            {state.checkout == 'success' && state.paymentLink && (
                <div className="text-center font-semibold">
                    Betaalverzoek aangemaakt!<br />
                    Indien niet automatisch doorgestuurd, <a href={state.paymentLink} className="underline text-blue-600" target="_blank" rel="noopener noreferrer">klik deze link</a>.
                </div>
            )}

            {state.checkout === 'error' && (
                <div className="text-center text-red-500 font-semibold space-y-2">
                    <div>Aanmaken betaallink mislukt.</div>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors font-bold"
                        onClick={() => setState(s => ({ ...s, checkout: 'form' }))}
                    >
                        Probeer opnieuw
                    </button>
                </div>
            )}
        </div>

        <div className="p-4 border-t">
             <div className="flex justify-between font-semibold mb-4">
                <span>Totaal</span>
                <span>€{(Array.from(context.storage.values()).reduce((acc, item) => {
                    return acc + (item.pricePerUnit * item.quantity / 100)
                }, 0)).toFixed(2)}</span>
            </div>

            {state.checkout == 'idle' && <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={context.storage.size === 0}
                onClick={() => setState(s => ({ ...s, checkout: 'form' }))}
            >
                Bestellen
            </button>}
        </div>
    </div>
}
