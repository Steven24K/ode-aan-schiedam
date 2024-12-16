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
}) & DataLoaderMethods<a>

type DataLoaderMethods<a> = {
    getValue: () => Option<a>
}

const _dataLoaderMethods = <a>(): DataLoaderMethods<a> => ({
    getValue: function (this: DataLoader<a>): Option<a> {
        if (this.kind == 'loaded') return Some(this.v)
        return None()
    }
})



export const unloaded = <a>(): DataLoader<a> =>
    ({ kind: 'unloaded', ..._dataLoaderMethods() })

export const loading = <a>(_loader: () => Promise<DataLoader<a>>): DataLoader<a> =>
    ({ kind: 'loading', loader: _loader, ..._dataLoaderMethods() })

const failed = <a>(_msg: string = ""): DataLoader<a> =>
    ({ kind: 'failed', msg: _msg, ..._dataLoaderMethods() })

const loaded = <a>(_v: a): DataLoader<a> =>
    ({ kind: 'loaded', v: _v, ..._dataLoaderMethods() })


type DataLoaderOptions<b> = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    body: b
    errorMsg: string
    parser: (json: any, headers: Headers) => b
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
        if (options.parser) json = options.parser(json, response.headers)
        return loaded(json)
    }
    return failed(options.errorMsg || `Server responded with status code: ${response.status}`)
}