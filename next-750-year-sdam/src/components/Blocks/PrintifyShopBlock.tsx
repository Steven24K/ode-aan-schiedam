import { PageBlock } from "@/types/PageBlock"
import { getPrintifyProducts } from "@/services/PrintifyShopService"
import { Pagination } from "../Pagination"
import { PrintifyProductList } from "../PrintifyProductList"
import { ShoppingCartButton } from "../ShoppingCartButton"


export const PrintifyShopBlock = async (block: PageBlock) => {

    if (block.__component !== 'blocks.printify-shop') return <div>Block does not exist {JSON.stringify(block)}</div>

    const { Paginated, Size, pageParams } = block
    const _searchParams = await pageParams.searchParams
    const currentPage = _searchParams['product_page'] && !isNaN(Number(_searchParams['product_page'])) ? Number(_searchParams['product_page']) : 1

    let products = await getPrintifyProducts(Size, currentPage)
    if (products.kind == 'error') return <div>Error while fetching products {products.error}</div>

    const pageCount = Math.ceil(products.data.total / (Size || 1))

    return <div key={`${block.__component}_${block.id}`} className="container">
        <ShoppingCartButton />
        <PrintifyProductList products={products.data} />
        {Paginated && pageCount > 1 && <Pagination currentPage={currentPage} totalPages={pageCount} pageParamName="product_page" />}
    </div>
}