"use client"
import { useState } from "react";
import Image from "next/image";

type SplashScreenProps = {
    // siteInfo: SiteInfo
    unSplash: () => void
}

type SplashState = {
    animate: boolean
}

export const Splash = (props: SplashScreenProps) => {
    const { unSplash } = props;
    const [state, setState] = useState<SplashState>({ animate: false })

    const onDone = () => {
        if (state.animate) {
            unSplash()
        }
    }

    const animate = () => setState(s => ({ ...s, animate: true }))

    return <div className="splash-wrapper">
        <div onAnimationEnd={onDone} className={`${state.animate ? 'curtain-up' : 'splash-screen'} flex flex-col items-center justify-center h-full text-center`} >
            <div className={`splash-shield ${state.animate ? 'animate-splash' : ''} flex flex-col items-center justify-center`}>

                <h1 className="splash-title">{'750 jaar Schiedam in Odes'}</h1>

                <button onClick={animate} className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-8 mt-4">
                    {'Ontdek de verhalen van de stad'}
                </button>

                <Image
                    className="splash-logo mt-4"
                    width={4320}
                    height={4320}
                    src={'/img/logos/SDAM750-label_RGB.png'}
                    alt="750 Schiedam Logo"
                />

            </div>
        </div>
    </div>
};
