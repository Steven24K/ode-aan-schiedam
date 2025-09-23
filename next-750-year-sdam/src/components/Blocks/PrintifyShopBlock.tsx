import { PageBlock } from "@/types/PageBlock"
import { getPrintifyProducts } from "@/services/PrintifyShopService"
import { PrintifyShopContext } from "./PrintifyShopContext"


export const PrintifyShopBlock = async (block: PageBlock) => {

    if (block.__component !== 'blocks.printify-shop') return <div>Block does not exist {JSON.stringify(block)}</div>

    const { Paginated, Size } = block

    let products = await getPrintifyProducts()
    if (products.kind == 'error') return <div>Error while fetching products</div>


    return <div key={`${block.__component}_${block.id}`} className="container">
        <PrintifyShopContext products={products.data} />
    </div>
}