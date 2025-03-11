import { StrapiCMSService } from "@/services/StrapiCMSService"

export async function SiteMetaData() {
    const strapi = new StrapiCMSService()

    const siteInfo = await strapi.getSiteInfo()


    if (siteInfo.kind != 'ok') return <title>{siteInfo.error}</title>

    const _title = siteInfo.data.SiteName
    const _slogan = siteInfo.data.Slogan
    const _icon = siteInfo.data.Icon.formats.small.url

    return <>
        <title>{_title}</title>
        <meta name="description" content={_slogan} />
        <meta property="og:title" content={_title} />
        <meta property="og:description" content={_slogan} />
        <meta property="og:image" content={`${_icon}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={_title} />
        <meta name="twitter:description" content={_slogan} />
        <meta name="twitter:image" content={`${_icon}`} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        <link rel="icon" href={`${_icon}`} type="image/png" />
    </>
}