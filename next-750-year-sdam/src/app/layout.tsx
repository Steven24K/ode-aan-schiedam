import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import "./styling.scss";
import { getIcon, getSiteInfo, getSlogan, getTitle } from "./api/GetSiteInfo";
import { use } from "react";

type LayoutProps = { children: React.ReactNode; }

export default function RootLayout(props: Readonly<LayoutProps>) {
  const { children } = props

  const siteInfo = getSiteInfo()

  const _title = use(getTitle(siteInfo))
  const _slogan = use(getSlogan(siteInfo))
  const _icon = use(getIcon(siteInfo))

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

        <NavBar />

        {children}

        <Footer />

      </body>
    </html>
  );
}
