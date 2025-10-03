"use client"
import { initialProductContext, ProductPageContext, ProductPageDispatchContext, ProductPageReducer } from "@/contexts/ProductPageContext"
import { useReducer } from "react"

interface ProductPageProviderprops {
    defaultVariantId: number
    children?: React.ReactNode
}

export const ProductPageProvider = (props: ProductPageProviderprops) => {
    const [productPage, dispatch] = useReducer(ProductPageReducer, initialProductContext(props.defaultVariantId))

    return <ProductPageContext value={productPage}>
        <ProductPageDispatchContext value={dispatch}>
            {props.children}
        </ProductPageDispatchContext>
    </ProductPageContext>
}