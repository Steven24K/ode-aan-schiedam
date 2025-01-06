import Image from "next/image"
import Link from "next/link"
import { use } from "react"

type HeroProps = {
    title: Promise<string>
    description?: Promise<string | undefined>
    cta?: {
        text: string
        to: string
    }
}

export const Hero = (props: HeroProps) => {
    const { title, description, cta } = props

    const _title = use(title)
    const _description = description ? use(description) : null

    return <header className="hero">
        <Image
            className="hart"
            width={2382}
            height={2382}
            src={'/img/logos/SDAM750-hart_RGB.png'}
            alt="750 Schiedam Logo"
        />
        <div className="hero-content flex flex-col justify-center items-center h-full space-y-4">
            <h1 className="text-center text-4xl p-1">{_title}</h1>
            {
                _description &&
                <p className="text-center">{_description}</p>
            }
            {
                cta &&
                <Link href={cta.to} className="text-center text-white bg-blue-500 py-4 px-8 hover:bg-blue-700">
                    {cta.text}
                </Link>
            }
        </div>
    </header>
}