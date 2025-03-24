"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
    faFacebook,
    faWhatsapp,
    faXTwitter,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons"
import {
    faEnvelope,
    faCopy,
    faCamera
} from "@fortawesome/free-solid-svg-icons"
import { Either } from '@/types/Either'
import { useEffect, useState } from 'react'

type ShareIcon = IconDefinition & {
    shareAction: Either<string, () => void>
}



export const SocialButtons = () => {

    const [icons, setIcons] = useState<ShareIcon[]>([])

    useEffect(() => setIcons([
        { ...faWhatsapp, shareAction: { type: 'left', value: `https://wa.me/?text=Een verhaal van Ode aan Schiedam: ${document.location.href}` } },
        { ...faFacebook, shareAction: { type: 'left', value: `https://www.facebook.com/sharer/sharer.php?u=${document.location.href}` } },
        { ...faEnvelope, shareAction: { type: 'left', value: `mailto:?subject=Ode aan Schiedam&body=Een verhaal van Ode Aan Schiedam: ${document.location.href}` } },
        { ...faCopy, shareAction: { type: 'right', value: () => navigator.clipboard.writeText(document.location.href) } },
        { ...faCamera, shareAction: { type: 'right', value: () => window.print() } },
        { ...faXTwitter, shareAction: { type: 'left', value: `https://x.com/share?text=Een verhaal van Ode aan Schiedam&url=${document.location.href}&hashtags=schiedam,odeaanschiedam,poezie` } },
        { ...faLinkedin, shareAction: { type: 'left', value: `https://www.linkedin.com/sharing/share-offsite/?text=Een verhaal van Ode aan Schiedam: ${document.location.href}` } },
    ]), [])

    library.add(icons)

    return <div className='socials'>
        {
            icons.map(icon => {
                if (icon.shareAction.type === 'left') {
                    return <a key={icon.iconName} href={icon.shareAction.value} target='_blank' rel='noreferrer'>
                        <FontAwesomeIcon icon={icon} />
                    </a >
                }
                return <i key={icon.iconName} onClick={icon.shareAction.value}>
                    <FontAwesomeIcon icon={icon} />
                </i>
            })
        }
    </div>
}