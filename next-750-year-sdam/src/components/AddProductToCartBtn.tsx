"use client"
import { ShoppingCartContext, ShoppingCartDispatchContext, ShoppingCartProduct } from "@/contexts/ShoppingCartContext"
import { PrintifyProduct, PrintifyProductVariant } from "@/types/PrintifyProduct"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FC, useContext } from "react"

interface AddProductToCartBtnProps {
    product: PrintifyProduct
    selectedVariant: PrintifyProductVariant
}

export const AddProductToCartBtn: FC<AddProductToCartBtnProps> = (props) => {
    const { product, selectedVariant } = props

    const state = useContext(ShoppingCartContext)
    const dispatch = useContext(ShoppingCartDispatchContext)

    const openSideBar = () => dispatch(['sidebar', 'open'])

    return <button
        type="button"
        aria-label="Add to cart"
        className="text-sm bg-green-500 text-white py-2 px-8 flex items-center gap-2 rounded hover:bg-green-600 transition"
        onClick={() => {
            const newProduct: ShoppingCartProduct = {
                label: product.title,
                productId: product.id,
                variantLabel: selectedVariant.title,
                variantId: selectedVariant.id,
                quantity: 1,
                pricePerUnit: selectedVariant.price,
                sku: selectedVariant.sku
            }

            if (state.storage.has(selectedVariant.id.toString())) {
                const existingProduct = state.storage.get(selectedVariant.id.toString())!
                newProduct.quantity += existingProduct.quantity
            }

            dispatch(['storage', state.storage.set(selectedVariant.id.toString(), newProduct)])

            openSideBar()
        }}
    >
        <FontAwesomeIcon
            icon={faShoppingCart}
            size="xs"
            className="text-white mr-1"
            style={{ fontSize: "1.5em" }}
        />
        <span>Voeg toe</span>
    </button>
}