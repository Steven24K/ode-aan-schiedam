import Link from "next/link"

type PaginationProps = {
    currentPage: number
    totalPages: number
    pageParamName: string
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, pageParamName }) =>
    <div className="mb-4 flex flex-wrap">
        {currentPage > 1 && (
            <a href={`?${pageParamName}=${currentPage - 1}`} className="mr-2 px-2 py-1 border border-yellow-500 bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors duration-200 ease-in-out">
                Vorige
            </a>
        )}

        {
            Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                return <a key={pageNumber} href={`?${pageParamName}=${pageNumber}`} className={`px-2 py-1 border border-yellow-500 ${currentPage == pageNumber ? 'bg-yellow-500 text-white' : 'bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors duration-200 ease-in-out'}`}>
                    {pageNumber}
                </a>
            }
            )
        }

        {currentPage < totalPages && (
            <a href={`?${pageParamName}=${currentPage + 1}`} className="ml-2 px-2 py-1 border border-yellow-500 bg-white text-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors duration-200 ease-in-out">
                Volgende
            </a>
        )}
    </div>