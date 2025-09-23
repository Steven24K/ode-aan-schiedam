"use client"
import { initialState, ShoppingCartContext, ShoppingCartDispatchContext, ShoppingCartReducer } from "@/contexts/ShoppingCartContext"
import { ShoppingCart } from "../ShoppingCart"
import { useReducer } from "react"
import { PrintifyProductList } from "../PrintifyProductList"
import { PrintifyProductPage } from "@/types/PrintifyProduct"

interface PrintifyShopContextProps {
    products: PrintifyProductPage
}

export const PrintifyShopContext = (props: PrintifyShopContextProps) => {
    const [shoppingCart, dispatch] = useReducer(ShoppingCartReducer, initialState())
    const { products } = props
    return <ShoppingCartContext value={shoppingCart}>
        <ShoppingCartDispatchContext value={dispatch}>
            <ShoppingCart />
            <PrintifyProductList {...products} />
        </ShoppingCartDispatchContext>
    </ShoppingCartContext>
}