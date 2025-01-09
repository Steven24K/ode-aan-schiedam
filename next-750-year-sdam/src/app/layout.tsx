import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import "./styling.scss";
import { use } from "react";
import { StrapiCMSService } from "@/services/StrapiCMSService";

type LayoutProps = { children: React.ReactNode; }

export default function RootLayout(props: Readonly<LayoutProps>) {
  const { children } = props

  const strapi = new StrapiCMSService()
  const siteInfo = strapi.getSiteInfo()

  const title = StrapiCMSService.getTitle(siteInfo)
  const _title = use(title)

  const slogan = StrapiCMSService.getSlogan(siteInfo)
  const _slogan = use(slogan)

  const icon = StrapiCMSService.getIcon(siteInfo)
  const _icon = use(icon)

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
