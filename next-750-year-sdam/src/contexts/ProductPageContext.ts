import { ActionDispatch, createContext } from "react"

export interface ProductPageContextState {
    selectedVariantId: number
}

export const initialProductContext = (defaultVariantId: number): ProductPageContextState => ({
    selectedVariantId: defaultVariantId
})

export const ProductPageReducer = <K extends keyof ProductPageContextState>(currentContext: ProductPageContextState, update: [K, ProductPageContextState[K]]): ProductPageContextState =>
    ({ ...currentContext, [update[0]]: update[1] })

export const ProductPageContext = createContext<ProductPageContextState>(initialProductContext(-1))
export const ProductPageDispatchContext = createContext<ActionDispatch<[update: [keyof ProductPageContextState, ProductPageContextState[keyof ProductPageContextState]]]>>((() => { }))