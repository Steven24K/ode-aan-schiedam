"use client";
import { useState } from "react";
import Link from "next/link";

export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (url: string): string => {
        if (URL.canParse(url)) return ''
        const parsed = new URL(url, document.location.origin)
        if (parsed.pathname == document.location.pathname) return 'active'
        return ''
    }

    const menu = [
        { text: "Home", to: "/?splashed=true" },
        { text: "About Us", to: "/about" },
        { text: "Contact Us", to: "/contact" },
    ]

    return <nav>
        <button className={`menu-button`} onClick={toggleMenu}>
            <span>{isMenuOpen ? "✘" : "☰"}</span>
        </button>
        <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
            <nav>
                <ul className={`menu-list`}>
                    {
                        menu.map(item => <li>
                            <Link className={isActive(item.to)} onClick={toggleMenu} href={item.to}>
                                {item.text}
                            </Link>
                        </li>)
                    }
                </ul>
            </nav>
        </div>
    </nav>
}