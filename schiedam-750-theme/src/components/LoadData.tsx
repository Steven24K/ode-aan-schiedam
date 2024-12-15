import { DataLoader } from "../types/DataLoader"
import { Loader } from "./Loader"

interface LoadDataProps<a> {
    loader: DataLoader<a>
    updater: (data: DataLoader<a>) => void
}

export function LoadData<a>(props: LoadDataProps<a>): React.ReactNode {
    let { loader, updater } = props

    if (loader.kind == 'loading') loader.loader().then(v => updater(v))

    if (loader.kind == 'loading') return <Loader />
    if (loader.kind == 'failed') return <div className="alert-error">{loader.msg}</div>
    return null
}