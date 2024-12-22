import React from "react"
import { DataLoader, loadData, loading, unloaded } from "../types/DataLoader"
import { WordPressNavigationItem } from "../types/WordPressNavigation"
import { LoadData } from "./LoadData"
import { NavLink } from "react-router-dom"

type FooterProps = {
    location: string
}

type FooterState = {
    menu: DataLoader<WordPressNavigationItem[]>
}

const zeroFooterState = (): FooterState => ({
    menu: unloaded()
})
export const Footer = (props: FooterProps) => {
    const { location } = props
    const [state, setState] = React.useState<FooterState>(zeroFooterState)

    if (state.menu.kind == 'unloaded')
        setState(s => ({ ...s, menu: loading(loadData(`/wp-json/custom/v1/menu?menu=${location}`)) }))

    return <footer className="footer" id="footer">
        <LoadData loader={state.menu}
            updater={data => setState(s => ({ ...s, menu: data }))}
        />
        <ul className="footer__list">
            {
                state.menu
                    .getValue()
                    .visit(items => items, () => [])
                    .map(item => <li key={item.ID} className="footer__item">
                        <NavLink
                            className="footer__link"
                            to={new URL(item.url).href}
                        >
                            {item.title}
                        </NavLink>
                    </li>)
            }
        </ul>
    </footer>
}