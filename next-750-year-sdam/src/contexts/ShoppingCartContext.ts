import { PrintifyProductPage } from "@/types/PrintifyProduct";
import { ActionDispatch, createContext } from "react";


// id => [quantity, product]
// product => internal id, label, product id and variant id

export interface ShoppingCartProduct {
    internalId: string
    label: string
    productId: string
    variantId: number
    quantity: number
    pricePerUnit: number
}

export type ShoppingCartStorage = Map<string, ShoppingCartProduct>
export type SideBarState = 'open' | 'closed'

export interface ShoppingCartState {
    storage: ShoppingCartStorage
    sidebar: SideBarState
    products?: PrintifyProductPage
}

export const initialState = (): ShoppingCartState => ({
    sidebar: 'closed',
    storage: new Map(),
    products: undefined
})

export const ShoppingCartReducer = <K extends keyof ShoppingCartState>(currentState: ShoppingCartState, update: [K, ShoppingCartState[K]]): ShoppingCartState =>
    ({ ...currentState, [update[0]]: update[1] })

export const ShoppingCartContext = createContext<ShoppingCartState>(initialState())
export const ShoppingCartDispatchContext = createContext<ActionDispatch<[update: [keyof ShoppingCartState, ShoppingCartStorage | SideBarState | PrintifyProductPage]]>>(() => {})
