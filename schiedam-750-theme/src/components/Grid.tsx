import { NavLink } from "react-router-dom"

type GridProps = {
    items: GridItem[]
    primary_color: ColorPalette
    secondary_color: ColorPalette
    text_color: ColorPalette
}

type GridItem = {
    id: string | number
    title: string
    description?: string
    url: string
}

export const Grid = (props: GridProps) => {
    const { items, primary_color, secondary_color, text_color } = props
    return <section className="diamond-grid">
        {
            items.map(item => <div key={item.id} className={`diamond-wrapper ${primary_color}-bg`}>
                <NavLink
                    className={`diamond-item ${secondary_color}-bg`}
                    to={item.url}
                >
                    <h2 className={`diamond-title ${text_color}-text`}>{item.title}</h2>
                    {item.description && <p className={`diamond-description ${text_color}-text`} dangerouslySetInnerHTML={{ __html: item.description }}></p>}
                </NavLink>
            </div>)
        }
    </section>
}