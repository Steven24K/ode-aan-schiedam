import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import "./styling.scss";
import { getIcon, getSiteInfo } from "./api/GetSiteInfo";
import { use } from "react";

type LayoutProps = {
  children: React.ReactNode;
}

export default function RootLayout(props: Readonly<LayoutProps>) {
  const { children } = props

  const siteInfo = getSiteInfo()

  const _favicon = getIcon(siteInfo)

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={use(_favicon)} type="image/x-icon" />
        <link rel='stylesheet' id='wp-block-library-css' href='http://localhost:8080/wp-includes/css/dist/block-library/style.min.css?ver=6.7.1' type='text/css' media='all' />
      </head>
      <body>

        <NavBar />

        {children}

        <Footer />

      </body>
    </html>
  );
}
