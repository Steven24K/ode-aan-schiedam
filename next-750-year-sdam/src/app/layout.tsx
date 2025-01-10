import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { StrapiCMSService } from "@/services/StrapiCMSService";
import "./styling.scss";

type LayoutProps = { children: React.ReactNode; }

export default async function RootLayout(props: Readonly<LayoutProps>) {
  const { children } = props

  const strapi = new StrapiCMSService()
  const siteInfo = await strapi.getSiteInfo()

  const _title = siteInfo.data.SiteName
  const _slogan = siteInfo.data.Slogan
  const _icon = siteInfo.data.Icon

  const main_menu_item = strapi.GetMainMenu().then(data => data.data.Item)
  const footer_columns = strapi.GetFooterMenu().then(data => data.data)

  return (
    <html lang="en">
      <head>
        <title>{_title}</title>
        <meta name="description" content={_slogan} />
        <meta property="og:title" content={_title} />
        <meta property="og:description" content={_slogan} />
        <meta property="og:image" content={`http://localhost:1337${_icon.formats.small.url}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={_title} />
        <meta name="twitter:description" content={_slogan} />
        <meta name="twitter:image" content={`http://localhost:1337${_icon.formats.small.url}`} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        <link rel="icon" href={`http://localhost:1337${_icon.formats.small.url}`} type="image/png" />
      </head>
      <body>

        <NavBar items={main_menu_item} />

        {children}

        <Footer columns={footer_columns} />

      </body>
    </html>
  );
}
