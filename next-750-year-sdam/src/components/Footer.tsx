import Link from "next/link"

export const Footer = () => {
    return <footer className="footer py-8">
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
                    <h3 className="text-lg font-semibold mb-4">Partners</h3>
                    <ul>
                        <li className="mb-2"><Link href={'#'} className="hover:underline">Schiedam Viert</Link></li>
                        <li className="mb-2"><Link href={'#'} className="hover:underline">Bibliotheer Schiedam</Link></li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3 px-4">
                    <h3 className="text-lg font-semibold mb-4">Op deze site</h3>
                    <ul>
                        <li className="mb-2"><Link href={'#'} className="hover:underline">Wat is een ode?</Link></li>
                        <li className="mb-2"><Link href={'#'} className="hover:underline">Deel jouw verhaal!</Link></li>
                        <li className="mb-2"><Link href={'#'} className="hover:underline">Contact</Link></li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3 px-4">
                    <h3 className="text-lg font-semibold mb-4">Thema's</h3>
                    <ul>
                        <li className="mb-2"><Link href={'#'} className="hover:underline">Poëzie</Link></li>
                        <li className="mb-2"><Link href={'#'} className="hover:underline">Liefde</Link></li>
                        <li className="mb-2"><Link href={'#'} className="hover:underline">Gedachtenspinsels</Link></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 text-center">
                <p className="mb-4">Volg ons op <Link href={'https://instagram.com'} className="hover:underline">Instagram</Link></p>
                <p>© {new Date().getFullYear()} Ode aan Schiedam</p>
            </div>
        </div>
    </footer>
}