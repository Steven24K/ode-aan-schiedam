import { getPrintifyProducts } from "@/services/PrintifyShopService"
import { PageBlock } from "@/types/PageBlock"
import { DisplayPrintifyProduct } from "../DisplayPrintifyProduct"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons"



export const PrintifyShopBlock = async (block: PageBlock) => {
    if (block.__component !== 'blocks.printify-shop') return <div>Block does not exist {JSON.stringify(block)}</div>

    const { Paginated, Size } = block

    let products = await getPrintifyProducts()
    if (products.kind == 'error') return <div>Error while fetching products</div>

    return <div key={`${block.__component}_${block.id}`} className="container">

        <div className="flex justify-end mb-2 items-center">
            <button
            type="button"
            className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Open shopping cart"
            >
            <FontAwesomeIcon icon={faBasketShopping} />
            <span
                className="absolute top-1 right-12 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5"
                style={{ minWidth: 20, textAlign: "center" }}
            >
                {products.data.data.length}
            </span>
            </button>
        </div>

        <div className="flex flex-wrap gap-1">
            {
                products.data.data.map(product => <DisplayPrintifyProduct key={product.id} {...product} />)
            }
        </div>
    </div>
}