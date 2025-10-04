"use client"

import { AddProductToCartBtn } from "@/components/AddProductToCartBtn"
import { ProductPageContext } from "@/contexts/ProductPageContext"
import { PrintifyProduct } from "@/types/PrintifyProduct"
import { FC, useContext } from "react"

interface AddProductToCartBtnWrapperProps {
    product: PrintifyProduct
}

export const AddProductToShoppingCartWrapper: FC<AddProductToCartBtnWrapperProps> = (props) => {
    const context = useContext(ProductPageContext)
    const selectedVariant = props.product.variants.find(v => v.id === context.selectedVariantId) || props.product.variants.find(v => v.is_default)!
    return <AddProductToCartBtn
        product={props.product}
        selectedVariant={selectedVariant}
    />
}