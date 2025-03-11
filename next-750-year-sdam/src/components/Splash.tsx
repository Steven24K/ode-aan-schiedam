"use client"
import { useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { StrapiImage } from "@/types/StrapiImage";

type SplashScreenProps = {
    title: string
    slogan: string
    logo: StrapiImage
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


    return <div className="splash-wrapper">
        <div onAnimationEnd={onDone} className={`${state.animate ? 'curtain-up' : 'splash-screen'} flex flex-col items-center justify-center h-full text-center`} >
            <div className={`splash-shield ${state.animate ? 'animate-splash' : ''} flex flex-col items-center justify-center`}>

                <h1 className="splash-title">{title}</h1>

                <button onClick={animate} className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-4 mx-4">
                    {slogan}
                </button>

                <Image
                    className="splash-logo"
                    width={logo.width}
                    height={logo.height}
                    src={`${logo.url}`}
                    alt={logo.name}
                />
            </div>
        </div>
    </div>
};
