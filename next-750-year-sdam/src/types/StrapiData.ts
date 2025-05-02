export type StrapiData<T> = {
    data: T
    meta?: Partial<StrapiDataWithMeta>
}

export type StrapiDataWithMeta = {
    pagination: {
        page: number
        pageSize: number
        pageCount: number
        total: number
    }
}

export type ApiResult<T> = {
    kind: 'ok'
    data: T
    meta: Partial<StrapiDataWithMeta>
} | {
    kind: 'error'
    error: string
}

export const OkResult = <T>(data: T, meta = {}): ApiResult<T> => ({ kind: 'ok', data: data, meta: meta })
export const ApiError = <T>(_err: string): ApiResult<T> => ({ kind: 'error', error: _err })