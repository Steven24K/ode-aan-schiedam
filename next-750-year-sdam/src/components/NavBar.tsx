"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathName = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (url: string): string => {
        const parsed = url.split('?')
        if (parsed[0] == pathName) return 'active'
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
                        menu.map(item => <li key={item.to}>
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