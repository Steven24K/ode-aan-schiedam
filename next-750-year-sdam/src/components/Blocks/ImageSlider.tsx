"use client"
import { PageBlock } from "@/types/PageBlock";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

type SliderState = {
    currentSlide: number
}

export const ImageSlider = (props: PageBlock) => {
    if (props.__component !== 'blocks.image-slider') return <div>Block does not exist {JSON.stringify(props)}</div>

    const { Images } = props
    const [state, setState] = useState<SliderState>({ currentSlide: 0 })

    const nextSlide = () => setState({ currentSlide: (state.currentSlide + 1) % Images.length })
    const prevSlide = () => setState({ currentSlide: (state.currentSlide - 1 + Images.length) % Images.length })

    const goToSlide = (index: number) => setState({ currentSlide: index })

    useEffect(() => {
        const interval = setInterval(() => {
            setState((prevState) => ({
                currentSlide: (prevState.currentSlide + 1) % Images.length
            }));
        }, 6000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [Images.length]);

    return <>
        <div className="slideshow-container">

            {
                Images.map((image, index) => {
                    return <div key={index} className={`slideshow fade ${index == state.currentSlide ? 'show' : 'hide'}`}>
                        <div className="slider-counter">{index + 1} / {Images.length}</div>
                        <Image src={image.url}
                            width={image.width}
                            height={image.height}
                            alt={"Image " + index} />
                    </div>
                })
            }

            <a className="prev" onClick={prevSlide}>{'<'}</a>
            <a className="next" onClick={nextSlide}>{'>'}</a>

        </div>
        <br />

        <div className="text-center">
            {
            Images.map((_, index) => 
            <span key={index} className={`slider-dot ${index == state.currentSlide ? 'active' : ''}`} onClick={() => goToSlide(index)}></span>)
            }
 
        </div>
    </>
}