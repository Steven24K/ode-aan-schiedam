import Image from "next/image"
import Link from "next/link"

type HeroProps = {
    title: string
    description?: string
    cta?: {
        text: string
        to: string
    }
}

export const Hero = (props: HeroProps) => {
    const { title, description, cta } = props

    return <header className="hero">
        <Image
            className="hart"
            width={2382}
            height={2382}
            src={'/img/logos/SDAM750-hart_RGB.png'}
            alt="750 Schiedam Logo"
        />
        <div className="hero-content flex flex-col justify-center items-center h-full space-y-4">
            <h1 className="text-center text-4xl p-1">{title}</h1>
            {
                description &&
                <p className="text-center">{description}</p>
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