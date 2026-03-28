import { Color } from "@/types/Color"
import Image from "next/image"
import Link from "next/link"

type HeroProps = {
    title: string
    description?: string
    color: Color
    cta?: {
        text: string
        to: string
    }
}

export const Hero = (props: HeroProps) => {
    const { title, description, cta, color } = props

    return <header className={`hero bg-${color}`}>
        <Image
            className={`hart bg-${color}--light`}
            width={2382}
            height={2382}
            src={'/img/logos/heart-of-love.png'}
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
                <Link href={cta.to} className="text-center">
                    {cta.text}
                </Link>
            }
        </div>
    </header>
}