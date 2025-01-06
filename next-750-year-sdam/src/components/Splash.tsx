"use client"
import { use, useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { StrapiImage } from "@/types/StrapiImage";

type SplashScreenProps = {
    title: Promise<string>
    slogan: Promise<string>
    logo: Promise<StrapiImage>
}

type SplashState = {
    animate: boolean
}

export function Splash(props: SplashScreenProps) {
    const { title, slogan, logo } = props;
    const [state, setState] = useState<SplashState>({ animate: false })

    const onDone = () => {
        if (state.animate) {
            redirect('/?splashed=true')
        }
    }

    const animate = () => setState(s => ({ ...s, animate: true }))

    const _title = use(title)
    const _slogan = use(slogan)
    const _logo = use(logo)

    return <div className="splash-wrapper">
        <div onAnimationEnd={onDone} className={`${state.animate ? 'curtain-up' : 'splash-screen'} flex flex-col items-center justify-center h-full text-center`} >
            <div className={`splash-shield ${state.animate ? 'animate-splash' : ''} flex flex-col items-center justify-center`}>

                <h1 className="splash-title">{_title}</h1>

                <button onClick={animate} className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8">
                    {_slogan}
                </button>

                <Image
                    className="splash-logo mt-4"
                    width={_logo.formats.large.width}
                    height={_logo.formats.large.height}
                    src={`http://localhost:1337${_logo.formats.large.url}`}
                    alt={_logo.formats.large.name}
                />

            </div>
        </div>
    </div>
};
