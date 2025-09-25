"use client"
import React, { useContext, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons/faShoppingCart";
import { ShoppingCartContext, ShoppingCartDispatchContext } from "@/contexts/ShoppingCartContext";
import { PrintifyProductPage } from "@/types/PrintifyProduct";


export const PrintifyProductList: React.FC<PrintifyProductPage> = (products) => {
    const state = useContext(ShoppingCartContext)
    const dispatch = useContext(ShoppingCartDispatchContext)

    const toggleSideBar = () => dispatch(['sidebar', state.sidebar == 'open' ? 'closed' : 'open'])


    return <div className="flex flex-wrap gap-1">
        {
            products.data.map(product => {
                const variants = product.variants
                const [selectedSize, setSelectedSize] = useState<number>(variants[0].id);
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
                        <strong className="font-medium">Tags:</strong> {tags.join(", ")}
                    </div>
                    <div className="mb-2 text-sm text-gray-700">
                        <strong className="font-medium">Available sizes:</strong> {sizesInfo}
                    </div>
                    <div className="mb-2">
                        <strong className="font-medium">Select size:</strong>
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
                        <strong className="font-medium">Price:</strong>{" "}
                        <span className="text-lg font-bold text-gray-900">
                            €{(selectedVariant.price / 100).toFixed(2)}
                        </span>
                    </div>
                    <Link
                        href={`/product/${product.id}`}
                        className="mt-4 inline-block text-blue-600 hover:underline font-medium"
                    >
                        More info
                    </Link>
                    <div>
                        <button
                            type="button"
                            aria-label="Add to cart"
                            className="text-sm bg-green-500 text-white py-2 px-8 flex items-center gap-2 rounded hover:bg-green-600 transition"
                            onClick={toggleSideBar}
                        >
                            <FontAwesomeIcon
                                icon={faShoppingCart}
                                size="xs"
                                className="text-white mr-1"
                                style={{ fontSize: "1.5em" }}
                            />
                            <span>Add to cart</span>
                        </button>
                    </div>
                </div>
            })
        }
    </div>
};