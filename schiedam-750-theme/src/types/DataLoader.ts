import { None, Option, Some } from "./Option"

export type DataLoader<a> = ({
    kind: 'loaded'
    v: a
} |
{
    kind: 'loading'
    loader: () => Promise<DataLoader<a>>
} |
{
    kind: 'failed'
    msg: string
} |
{
    kind: 'unloaded'
}) & {
    getValue: () => Option<a>
}



export const unloaded = <a>(): DataLoader<a> =>
    ({ kind: 'unloaded', getValue: () => None() })

export const loading = <a>(_loader: () => Promise<DataLoader<a>>): DataLoader<a> =>
    ({ kind: 'loading', loader: _loader, getValue: () => None() })

export const failed = <a>(_msg: string = ""): DataLoader<a> =>
    ({ kind: 'failed', msg: _msg, getValue: () => None() })

export const loaded = <a>(_v: a): DataLoader<a> =>
    ({ kind: 'loaded', v: _v, getValue: () => Some(_v) })


type DataLoaderOptions<b> = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body: b
    errorMsg: string
    parser: (json: any) => b
}

export const loadData = <a, b = object>(url: string, options: Partial<DataLoaderOptions<b>> = {}) => async (): Promise<DataLoader<a>> => {
    let response = await fetch(url,
        {
            headers: { 'Content-Type': 'application/json' },
            method: options.method,
            body: JSON.stringify(options.body),
        }
    )
    if (response.ok) {
        let json = await response.json()
        if (options.parser) json = options.parser(json)
        return loaded(json)
    }
    return failed(options.errorMsg || `Server responded with status code: ${response.status}`)
}