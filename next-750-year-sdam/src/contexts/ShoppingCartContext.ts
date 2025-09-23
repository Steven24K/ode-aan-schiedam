import { PrintifyProduct } from "@/types/PrintifyProduct";
import { ActionDispatch, createContext } from "react";


// id => [quantity, product]
export type ShoppingCartStorage = Map<string, [number, PrintifyProduct]>
export type SideBarState = 'open' | 'closed'

export interface ShoppingCartState {
    storage: ShoppingCartStorage
    sidebar: SideBarState
}

export const initialState = (): ShoppingCartState => ({
    sidebar: 'closed',
    storage: new Map()
})

export const ShoppingCartReducer = <K extends keyof ShoppingCartState>(currentState: ShoppingCartState, update: [K, ShoppingCartState[K]]): ShoppingCartState =>
    ({ ...currentState, [update[0]]: update[1] })

export const ShoppingCartContext = createContext<ShoppingCartState>(initialState())
export const ShoppingCartDispatchContext = createContext<ActionDispatch<[update: [keyof ShoppingCartState, ShoppingCartStorage | SideBarState]]>>(() => {})
