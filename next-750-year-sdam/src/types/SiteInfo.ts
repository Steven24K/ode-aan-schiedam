import { StrapiImage } from "./StrapiImage"
import { StrapiPage } from "./StrapiPage"

export type SiteInfo = {
    SiteName: string
    Slogan: string
    Icon: StrapiImage
    CheckoutSuccess: StrapiPage
    CheckoutCancel: StrapiPage
}