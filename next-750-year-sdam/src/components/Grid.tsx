import { Color } from "@/types/Color"
import Link from "next/link"

export type GridItem = {
    id: number
    title: string
    color: Color
    slug: string
}

export type GridProps = {
    items: GridItem[]
}

export const Grid = (props: GridProps) => {
    const { items } = props

    return <section className="grid">
        {
            items.map((item) => {
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