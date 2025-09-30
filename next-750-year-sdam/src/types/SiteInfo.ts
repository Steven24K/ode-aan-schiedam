import { StrapiImage } from "./StrapiImage"
import { StrapiPage } from "./StrapiPage"

export type SiteInfo = {
    SiteName: string
    Slogan: string
    Icon: StrapiImage
    CheckoutRedirect: StrapiPage
    CheckoutCancel: StrapiPage
}