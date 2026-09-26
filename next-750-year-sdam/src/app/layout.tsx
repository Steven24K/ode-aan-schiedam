import { NavBar } from "@/components/NavBarWrapper";
import { Footer } from "@/components/Footer";
import ErrorBoundary from "../components/Error/ErrorBoundary";

import "./styling.scss";
import { SiteMetaData } from "@/components/SiteMetaData";
import { GeneralError } from "@/components/Error/GeneralError";
// import { ShoppingCart } from "@/components/ShoppingCart";
// import { ShoppingCartProvider } from "@/components/Blocks/ShoppingCartProvider";
import { StrapiCMSService } from "@/services/StrapiCMSService";

export const dynamic = 'force-dynamic'

type LayoutProps = { children: React.ReactNode; }

export default async function RootLayout(props: Readonly<LayoutProps>) {
  const { children } = props

  const strapi = new StrapiCMSService()

  const siteInfo = await strapi.getSiteInfo()

  return (
    <html lang="en">
      <head>
        <SiteMetaData siteInfo={siteInfo} />
      </head>
      <body>
        <ErrorBoundary dev fallBack={<GeneralError />}>
          <NavBar />

          <main>
            {/* <ShoppingCartProvider> */}
              {children}
              {/* <ShoppingCart siteInfo={siteInfo} /> */}
            {/* </ShoppingCartProvider> */}
          </main>

          <Footer />
        </ErrorBoundary>
      </body>
    </html >
  );
}
