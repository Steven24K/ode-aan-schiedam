"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
    faFacebook,
    faInstagram,
    faXTwitter,
    faWhatsapp,
    faLinkedin,
    faReddit,
    faBluesky,
} from "@fortawesome/free-brands-svg-icons"
import {
    faEnvelope,
    faCopy,
    faCamera
} from "@fortawesome/free-solid-svg-icons"
import { Either } from '@/types/Either'

type ShareIcon = IconDefinition & {
    shareAction: Either<string, () => void>
}



export const SocialButtons = () => {

    const icons: ShareIcon[] = [
        { ...faEnvelope, shareAction: { type: 'left', value: `mailto:?subject=Ode aan Schiedam&body=Een verhaal van Ode Aan Schiedam: ${document.location.href}` } },
        { ...faCopy, shareAction: { type: 'right', value: () => navigator.clipboard.writeText(document.location.href) } },
        { ...faCamera, shareAction: { type: 'right', value: () => window.print() } },
        { ...faInstagram, shareAction: { type: 'left', value: `https://instagram.com/hello_world_my_name_is_steven` } },
        { ...faFacebook, shareAction: { type: 'left', value: `https://www.facebook.com/sharer/sharer.php?u=${document.location.href}` } },
        { ...faWhatsapp, shareAction: { type: 'left', value: `https://wa.me/?text=Een verhaal van Ode aan Schiedam: ${document.location.href}` } },
        { ...faXTwitter, shareAction: { type: 'left', value: `https://x.com/share?text=Een verhaal van Ode aan Schiedam&url=${document.location.href}&hashtags=schiedam,odeaanschiedam,poezie` } },
        { ...faLinkedin, shareAction: { type: 'left', value: `https://www.linkedin.com/sharing/share-offsite/?text=Een verhaal van Ode aan Schiedam: ${document.location.href}` } },
        { ...faBluesky, shareAction: { type: 'left', value: `https://bsky.app/intent/compose?text=Een verhaal van Ode Aan Schiedam: ${document.location.href}` } },
        { ...faReddit, shareAction: { type: 'left', value: `https://www.reddit.com/submit?url=${document.location.href}` } },
    ]

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