import { Color } from "@/types/Color"
import Link from "next/link"
import { use } from "react"

export type GridItem = {
    id: number
    title: string
    color: Color
    slug: string
}

export type GridProps = {
    items: Promise<GridItem[]>
}

export const Grid = (props: GridProps) => {
    const { items } = props

    const _items = use(items)

    return <section className="grid">

        {_items.length === 0 && (
            <div className="text-lg border-2 border-gray-200 p-4 m-2">
                <p>Er is geen content gevonden. Kom later terug voor meer.</p>
            </div>
        )}
        {
            _items.map((item) => {
                return (
                    <div key={item.id} className="grid__item_wrapper">
                        <Link href={`${item.slug}`}>
                            <div className={`grid__item--${item.color}`}>
                                <h1>{item.title}</h1>
                            </div>
                        </Link>
                    </div>
                )
            })
        }
    </section>
}