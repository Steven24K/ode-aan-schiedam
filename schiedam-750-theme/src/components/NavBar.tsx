import { useState } from "react";
import { DataLoader, loadData, loading, unloaded } from "../types/DataLoader";
import { WordPressNavigationItem } from "../types/WordPressNavigation";
import { LoadData } from "./LoadData";
import { NavLink } from "react-router-dom";

type NavBarProps = {
    location: string
}

type NavBarState = {
    isOpen: boolean
    menu: DataLoader<WordPressNavigationItem[]>
}

const zeroNavBarState = (): NavBarState => ({
    isOpen: false,
    menu: unloaded()

})

export const NavBar = (props: NavBarProps) => {
    const { location } = props
    const [state, setState] = useState<NavBarState>(zeroNavBarState);

    const toggleNav = () => setState(s => ({ ...s, isOpen: !s.isOpen }))

    if (state.menu.kind == 'unloaded')
        setState(s => ({ ...s, menu: loading(loadData(`/wp-json/custom/v1/menu?menu=${location}`)) }))


    return <div className="side-navbar-wrapper">
        <div className="hanger">
            <img src="/wp-content/themes/schiedam-750-theme/assets/images/750-schiedam-slinger-alpha.png"
                height={230}
                width={'auto'}
            />
        </div>

        <button
            className={`toggle-button ${state.isOpen ? 'flipped' : ''}`}
            onClick={toggleNav}
            aria-label="Open Navigation"
        >
            <span>{state.isOpen ? "✘" : "☰"}</span>
        </button>
        <nav className={`side-navbar ${state.isOpen ? "side-navbar--open" : ""}`}>
            <LoadData loader={state.menu}
                updater={data => setState(s => ({ ...s, menu: data }))}
            />
            <ul className="side-navbar__list">
                {
                    state.menu
                        .getValue()
                        .visit(items => items, () => [])
                        .map(item => <li key={item.ID} className="side-navbar__item">
                            <NavLink to={new URL(item.url).pathname} className="side-navbar__link">{item.title}</NavLink>
                        </li>)
                }
            </ul>
        </nav>
    </div>
}