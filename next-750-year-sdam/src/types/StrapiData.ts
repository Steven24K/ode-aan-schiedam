export type StrapiData<T> = {
    data: T
}

export type ApiResult<T> = {
    kind: 'ok'
    data: T
} | {
    kind: 'error'
    error: string
}

export const OkResult = <T>(data: T): ApiResult<T> => ({ kind: 'ok', data: data })
export const ApiError = <T>(_err: string): ApiResult<T> => ({ kind: 'error', error: _err })