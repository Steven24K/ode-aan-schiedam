import { DisplayContent } from "@/components/DisplayContent"
import { Hero } from "@/components/Hero"
import { ShoppingCartButton } from "@/components/ShoppingCartButton"
import { getPrintifyProductById } from "@/services/PrintifyShopService"
import { PageProps } from "@/types/Params"
import { notFound } from "next/navigation"
import { ProductPageProvider } from "./ProductPageProvider"
import { AddProductToCartBtn } from "@/components/AddProductToCartBtn"
import { ProductVariants } from "./ProductVariants"

export default async function ProductPage(props: PageProps) {
    const { params } = props
    const _params = await params

    const product = await getPrintifyProductById(_params.id)
    if (product.kind == 'error') return notFound()


    const _product = product.data

    const variants = _product.variants.filter(v => v.is_enabled)
    const defaultVariant = variants.find(v => v.is_default) || variants[0]

    return <>
        <Hero title={_product.title} color="leafy-green" description={_product.tags[0] || ''} cta={{ text: 'Terug naar de homepage', to: '/' }} />

        <DisplayContent pageParams={props}>
            <ProductPageProvider defaultVariantId={defaultVariant.id}>

                <section className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow p-6">
                    {/* Gallery */}
                    <div className="flex gap-6 mb-6">
                        {/* Main image */}
                        <div className="flex-shrink-0 lg:w-full lg:h-full w-64 h-64 rounded-lg overflow-hidden border">
                            <img
                                src={_product.images[0]?.src || '/placeholder.png'}
                                alt={_product.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        {/* Thumbnails */}
                        <div className="flex flex-col gap-3 justify-start">
                            {(_product.images.slice(1, 4)).map((img, idx) => (
                                <div key={img.src} className="w-24 h-24 rounded-lg overflow-hidden border">
                                    <img
                                        src={img.src}
                                        alt={`${_product.title} thumbnail ${idx + 1}`}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            ))}
                            {_product.images.length > 4 && (
                                <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-lg border text-xl font-bold text-gray-500">
                                    +{_product.images.length - 4}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Title & Description */}
                    <h1 className="text-3xl font-bold mb-2">{_product.title}</h1>
                    {/* Tags */}
                    <div className="mb-4 flex flex-wrap gap-2">
                        {_product.tags.map(tag => (
                            <span key={tag} className="bg-leafy-green/10 text-leafy-green px-3 py-1 rounded-full text-sm font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: _product.description }} />

                    {/* Variants */}
                    <ProductVariants variants={variants} />

                    <AddProductToCartBtn
                        product={_product}
                        selectedVariant={variants[0]}
                    />
                </section>
            </ProductPageProvider>

            <ShoppingCartButton />

        </DisplayContent>
    </>
}