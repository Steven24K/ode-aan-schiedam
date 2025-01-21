import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, IconProp, icon } from '@fortawesome/fontawesome-svg-core'
import {
    faFacebook,
    faInstagram,
    faXTwitter,
    faWhatsapp,
    faLinkedin,
    faReddit,
    faBluesky,
    faSignalMessenger,
    faTelegram,
} from "@fortawesome/free-brands-svg-icons"
import {
    faEnvelope,
    faCopy,
    faCamera
} from "@fortawesome/free-solid-svg-icons"

const icons = [
    faEnvelope,
    faCopy,
    faCamera,
    faInstagram,
    faFacebook,
    faWhatsapp,
    faSignalMessenger,
    faTelegram,
    faXTwitter,
    faLinkedin,
    faBluesky,
    faReddit,
]

library.add(icons)

export const SocialButtons = () => {
    return <div className='socials'>
        {
            icons.map(icon => <a key={icon.iconName} 
            href='#'
            >
                <FontAwesomeIcon icon={icon} />
            </a>)
        }

    </div>
}