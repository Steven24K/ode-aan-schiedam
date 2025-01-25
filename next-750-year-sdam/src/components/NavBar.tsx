"use client";
import * as React from "react"
import { use, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/types/PageBlock";

interface NavBarProps {
    items: Promise<MenuItem[]>
}

export const NavBarContent = (props: NavBarProps) => {
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

    const _menu = use(props.items)

    return <>
        <button className={`menu-button`} onClick={toggleMenu}>
            <span>{isMenuOpen ? "✘" : "☰"}</span>
        </button>
        <nav className={`sidebar ${isMenuOpen ? "open" : ""}`}>
            <ul className={`menu-list`}>
                {
                    _menu.map(item => <li key={item.id}>
                        <Link className={isActive(item.URL)} onClick={toggleMenu} href={item.URL}>
                            {item.Title}
                        </Link>
                    </li>)
                }
            </ul>
        </nav>
    </>
}