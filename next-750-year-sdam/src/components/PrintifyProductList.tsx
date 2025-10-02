"use client"
import React, { useContext, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/faShoppingCart";
import { ShoppingCartContext, ShoppingCartDispatchContext, ShoppingCartProduct } from "@/contexts/ShoppingCartContext";
import { PrintifyProductPage } from "@/types/PrintifyProduct";

interface PrintifyProductListProps {
    products: PrintifyProductPage
}

export const PrintifyProductList: React.FC<PrintifyProductListProps> = (props) => {
    const { products } = props
    const state = useContext(ShoppingCartContext)
    const dispatch = useContext(ShoppingCartDispatchContext)

    React.useEffect(() => {
        if (products) {
            dispatch(['products', products]);
        }
    }, [products, dispatch]);

    const openSideBar = () => dispatch(['sidebar', 'open'])


    return <div className="flex flex-wrap gap-1">
        {
            products.data.map(product => {
                const variants = product.variants.filter(v => v.is_enabled)
                const defaultVariant = variants.find(v => v.is_default) || variants[0]
                const [selectedSize, setSelectedSize] = useState<number>(defaultVariant.id);
                const selectedVariant = product.variants.find(v => v.id === selectedSize)!

                const productImage = product.images[0]

                const tags = product.tags.slice(0, 5);

                const sizesInfo = variants.map((v) => v.title).join(", ");
                return <div key={product.id} className="border border-gray-200 p-4 rounded-lg lg:max-w-64 max-w-full bg-white shadow">
                    {productImage && (
                        <img
                            src={productImage.src}
                            alt={product.title}
                            className="w-full rounded mb-3 object-cover"
                        />
                    )}
                    <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                    <div className="mb-2 text-sm text-gray-700">
                        {tags.join(", ")}
                    </div>
                    <div className="mb-2 text-sm text-gray-700">
                        <strong className="font-medium">Beschikbare maten:</strong> {sizesInfo}
                    </div>
                    <div className="mb-2">
                        <strong className="font-medium">Kies maat:</strong>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {variants.map((size) => (
                                <button
                                    key={size.id}
                                    onClick={() => setSelectedSize(size.id)}
                                    className={`px-3 py-1 rounded border transition
                    ${selectedSize === size.id
                                            ? "border-blue-500 bg-blue-50 font-bold"
                                            : "border-gray-300 bg-white font-normal"
                                        }
                    ${!product.variants.find((v) => v.id === size.id && v.is_available)
                                            ? "opacity-50 cursor-not-allowed"
                                            : "hover:border-blue-400"
                                        }
                    `}
                                    disabled={
                                        !product.variants.find((v) => v.id === size.id && v.is_available)
                                    }
                                >
                                    {size.title}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <strong className="font-medium">Prijs:</strong>{" "}
                        <span className="text-lg font-bold text-gray-900">
                            €{(selectedVariant.price / 100).toFixed(2)}
                        </span>
                    </div>
                    <Link
                        href={`/product/${product.id}`}
                        className="mt-4 inline-block text-blue-600 hover:underline font-medium"
                    >
                        Meer info
                    </Link>
                    <div>
                        <button
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
                    </div>
                </div>
            })
        }
    </div>
};