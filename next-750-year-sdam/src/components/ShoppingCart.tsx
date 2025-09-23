"use client"
import { ShoppingCartContext, ShoppingCartDispatchContext, ShoppingCartReducer } from "@/contexts/ShoppingCartContext"
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useContext } from "react"


export const ShoppingCart: React.FC = () => {
    const state = useContext(ShoppingCartContext)
    const dispatch = useContext(ShoppingCartDispatchContext)

    const toggleSideBar = () => dispatch(['sidebar', state.sidebar == 'open' ? 'closed' : 'open'])

    return <ShoppingCartContext value={state}>
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
                    {1}
                </span>
            </button>
        </div>

        {/* Sidebar Shopping Cart */}
        <div
            className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 flex flex-col transition-transform duration-300 ${state.sidebar === 'open' ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-bold">Shopping Cart</h2>
                <button className="text-gray-500 hover:text-gray-700" aria-label="Close cart" onClick={toggleSideBar}>
                    &times;
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Example product item */}
                <div className="flex items-center justify-between gap-2 border-b pb-2">
                    <div>
                        <div className="font-semibold">Product Name</div>
                        <div className="text-sm text-gray-500">Size: M</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min={1}
                            defaultValue={1}
                            className="w-12 border rounded px-2 py-1 text-center"
                        />
                        <div className="text-sm">x €10.00</div>
                        <div className="font-bold ml-2">€10.00</div>
                    </div>
                    <button
                        className="ml-2 text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded border border-red-200"
                        aria-label="Remove item"
                    >
                        X
                    </button>
                </div>
                {/* Repeat product items as needed */}
            </div>
            <div className="p-4 border-t">
                <div className="flex justify-between font-semibold mb-4">
                    <span>Total</span>
                    <span>€10.00</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-bold">
                    Order Now
                </button>
            </div>
        </div>
    </ShoppingCartContext>
}