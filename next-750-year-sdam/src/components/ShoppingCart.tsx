"use client"
import { ShoppingCartContext, ShoppingCartDispatchContext } from "@/contexts/ShoppingCartContext"
import { PrintifyProductPage } from "@/types/PrintifyProduct"
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useContext, useEffect } from "react"
import { FormBuilder } from "./FormBuilder"

interface ShoppingCartProps {
    products: PrintifyProductPage
}

export const ShoppingCart: React.FC<ShoppingCartProps> = (props) => {
    const { products } = props
    const state = useContext(ShoppingCartContext)
    const dispatch = useContext(ShoppingCartDispatchContext)

    const toggleSideBar = () => dispatch(['sidebar', state.sidebar == 'open' ? 'closed' : 'open'])

    const [checkoutState, setCheckoutState] = React.useState<'idle' | 'form' | 'processing' | 'success'>('idle')

    useEffect(() => {
        if (state.sidebar == 'closed') {
            setCheckoutState('idle')
        }
    }, [state.sidebar])

    return <>
        <div className="flex justify-end mb-2 items-center">
            <button
                type="button"
                className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Open shopping cart"
                onClick={toggleSideBar}
            >
                <FontAwesomeIcon icon={faBasketShopping} />
                <span
                    className="absolute top-1 right-12 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5"
                    style={{ minWidth: 20, textAlign: "center" }}
                >
                    {state.storage.size}
                </span>
            </button>
        </div>

        {/* Sidebar Shopping Cart */}
        <div
            className={`fixed top-0 left-0 h-full w-96 bg-white shadow-lg z-50 flex flex-col transition-transform duration-300 ${state.sidebar === 'open' ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-bold">Shopping Cart</h2>
                <button className="text-gray-500 hover:text-gray-700" aria-label="Close cart" onClick={toggleSideBar}>
                    &times;
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Example product item */}

                {state.storage.size === 0 && <div className="text-center text-gray-500">Your cart is empty</div>}

                {
                    Array.from(state.storage.values()).map(cartItem => {
                        const product = products.data.find(p => p.id === cartItem.productId)!
                        const variant = product.variants.find(v => v.id === cartItem.variantId)!
                        return <div key={cartItem.internalId} className="flex items-center justify-between gap-2 border-b pb-2">
                            <div>
                                <div className="font-semibold">{product.title}</div>
                                <div className="text-sm text-gray-500">Size: {variant.title}</div>
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
                                        dispatch(['storage', state.storage.set(cartItem.variantId.toString(), updatedProduct)])
                                    }}
                                />
                                <div className="text-sm">x €{(variant.price / 100).toFixed(2)}</div>
                                <div className="font-bold ml-2">€{(variant.price * cartItem.quantity / 100).toFixed(2)}</div>
                            </div>
                            <button
                                className="ml-2 text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded border border-red-200"
                                aria-label="Remove item"
                                onClick={() => {
                                    state.storage.delete(cartItem.variantId.toString())
                                    if (state.storage.size === 0) {
                                        setCheckoutState('idle')
                                    }
                                    dispatch(['storage', state.storage])
                                }}
                            >
                                X
                            </button>
                        </div>
                    })
                }

                {checkoutState == 'form' && <FormBuilder<any>
                    defaultObject={{}}
                    fields={[
                        { name: 'name', label: 'First Name', kind: 'text', weight: 1, required: true },
                        { name: 'surname', label: 'Last Name', kind: 'text', weight: 2, required: true },
                        { name: 'email', label: 'Email', kind: 'email', weight: 3, required: true },
                        { name: 'phone', label: 'Phone', kind: 'text', weight: 4, required: false },
                        { name: 'country', label: 'Country', kind: 'dropdown', weight: 5, required: true, options: [{ name: 'NL', value: 'NL' }, { name: 'BE', value: 'BE' }] },
                        { name: 'address', label: 'Address', kind: 'text', weight: 4, required: true },
                        { name: 'city', label: 'City', kind: 'text', weight: 5, required: true },
                        { name: 'postalcode', label: 'Postal Code', kind: 'text', weight: 6, required: true },
                        { name: 'payment_method', label: 'Payment Method', kind: 'dropdown', weight: 7, required: true, options: [{ name: 'ideal', value: 'ideal' }, { name: 'creditcard', value: 'creditcard' }] }
                    ]}
                    handleChange={(key, value) => { }}
                    handleSubmit={() => { }}
                    submitText="Pay now"
                />}
            </div>
            <div className="p-4 border-t">
                <div className="flex justify-between font-semibold mb-4">
                    <span>Total</span>
                    <span>€{(Array.from(state.storage.values()).reduce((acc, item) => {
                        const product = products.data.find(p => p.id === item.productId)!
                        const variant = product.variants.find(v => v.id === item.variantId)!
                        return acc + (variant.price * item.quantity / 100)
                    }, 0)).toFixed(2)}</span>
                </div>

                {checkoutState == 'idle' && <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={state.storage.size === 0}
                    onClick={() => setCheckoutState('form')}
                >
                    Order Now
                </button>}
            </div>
        </div>
    </>
}
