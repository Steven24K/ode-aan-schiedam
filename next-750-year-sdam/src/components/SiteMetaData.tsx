import { SiteInfo } from "@/types/SiteInfo"
import { ApiResult } from "@/types/StrapiData"

interface SiteMetaDataProps {
    siteInfo: ApiResult<SiteInfo>

}


export async function SiteMetaData(props: SiteMetaDataProps) {
    const { siteInfo } = props

    if (siteInfo.kind != 'ok') return <title>{siteInfo.error}</title>

    const _slogan = siteInfo.data.Slogan
    const _title = `${siteInfo.data.SiteName} | ${_slogan}`
    const _icon = siteInfo.data.Icon.url

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