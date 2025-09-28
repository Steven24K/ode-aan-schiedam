"use client"
import { initialState, ShoppingCartContext, ShoppingCartDispatchContext, ShoppingCartReducer } from "@/contexts/ShoppingCartContext"
import { useReducer } from "react"

interface PrintifyShopProviderProps {
    children?: React.ReactNode
}

export const ShoppingCartProvider = (props: PrintifyShopProviderProps) => {
    const [shoppingCart, dispatch] = useReducer(ShoppingCartReducer, initialState())
    return <ShoppingCartContext value={shoppingCart}>
        <ShoppingCartDispatchContext value={dispatch}>
            {props.children}
        </ShoppingCartDispatchContext>
    </ShoppingCartContext>
}