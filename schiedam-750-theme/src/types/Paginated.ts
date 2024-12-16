export interface Paginated<T> {
    values: T[]
    total_pages: number
    page_size: number
    current_page: number
    total_items: number
}

export const _paginate = <T>(_values: T[], _current_page: number, _page_size: number, _total_pages: number, _total_items: number): Paginated<T> => ({
    values: _values,
    current_page: _current_page,
    page_size: _page_size,
    total_pages: _total_pages,
    total_items: _total_items,
}) 