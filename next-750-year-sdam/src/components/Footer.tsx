import { FooterMenu } from "@/types/Footer"
import Link from "next/link"
import { use } from "react"

interface FooterProps {
    columns: Promise<FooterMenu>
}

export const Footer = (props: FooterProps) => {
    const _columns = use(props.columns)

    return <footer className="footer py-8">
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-4">
                {
                    _columns.Columns.map(column => <div key={`column-${column.id}`} className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
                        <h3 className="text-lg font-semibold mb-4">{column.Title}</h3>
                        <ul>
                            {
                                column.Items.map(item => <li key={`item-footer-${item.id}`} className="mb-2">
                                    <Link href={item.URL} className="hover:underline">
                                        {item.Title}
                                    </Link>
                                </li>)
                            }

                        </ul>
                    </div>)
                }
            </div>

            <div className="mt-8 text-center">
                <p className="mb-4">Volg ons op <Link href={'https://instagram.com'} className="hover:underline">Instagram</Link></p>
                <p>© {new Date().getFullYear()} Ode aan Schiedam</p>
            </div>
        </div>
    </footer>
}