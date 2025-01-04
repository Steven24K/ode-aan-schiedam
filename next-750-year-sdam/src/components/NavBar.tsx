"use client";
import { useState } from "react";
import Link from "next/link";

export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return <nav>
        <button className={`menu-button`} onClick={toggleMenu}>
            <span>{isMenuOpen ? "✘" : "☰"}</span>
        </button>
        <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
            <nav>
                <ul className={`menu-list`}>
                    <li><Link href="/">Link 1</Link></li>
                    <li><Link href="/about">Link 2</Link></li>
                    <li><Link href="/contact">Link 3</Link></li>
                </ul>
            </nav>
        </div>
    </nav>
}