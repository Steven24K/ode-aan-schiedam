"use client"
import { ProductPageContext, ProductPageDispatchContext } from "@/contexts/ProductPageContext";
import { PrintifyProductVariant } from "@/types/PrintifyProduct";
import { FC, useContext } from "react";

interface ProductVariantProps {
    variants: PrintifyProductVariant[]
}

export const ProductVariants: FC<ProductVariantProps> = props => {
    const { variants } = props
    const context = useContext(ProductPageContext)
    const dispatch = useContext(ProductPageDispatchContext)

    return <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Kies variant</h2>
        <div className="flex flex-wrap gap-2">
            {variants
                .map(variant => (
                    <button
                        key={variant.id}
                        onClick={() => dispatch(['selectedVariantId', variant.id])}
                        className={`px-4 py-2 border border-blue-500 border-solid rounded transition
                            ${context.selectedVariantId === variant.id ? 'bg-blue-500 text-white' : 'text-blue-500'}
                            ${!variant.is_available ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500 hover:text-white"}
                            `}
                        type="button"
                        disabled={!variant.is_available}
                    >
                        {variant.title}
                    </button>
                ))}
        </div>
    </div>
}