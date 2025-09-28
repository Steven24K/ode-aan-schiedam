"use client"
import { ShoppingCartContext, ShoppingCartDispatchContext } from "@/contexts/ShoppingCartContext"
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext } from "react"

export const ShoppingCartButton: React.FC = () => {
    const state = useContext(ShoppingCartContext)
    const dispatch = useContext(ShoppingCartDispatchContext)

    const toggleSideBar = () => dispatch(['sidebar', state.sidebar == 'open' ? 'closed' : 'open'])

    return <div className="flex justify-end mb-2 items-center">
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
}