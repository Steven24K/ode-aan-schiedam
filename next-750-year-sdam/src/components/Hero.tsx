import Image from "next/image"

type HeroProps = {
    title: string
}

export const Hero = (props: HeroProps) => {
    const { title } = props

    return <header className="hero">
        <Image
            className="hart"
            width={2382}
            height={2382}
            src={'/img/logos/SDAM750-hart_RGB.png'}
            alt="750 Schiedam Logo"
        />
        <div className="flex justify-center items-center h-full">
            <h1 className="text-center text-4xl">{title}</h1>
        </div>
    </header>
}