import { NavBarWrapper } from "@/components/NavBarWrapper";
import { Footer } from "@/components/Footer";
import ErrorBoundary from "../components/Error/ErrorBoundary";

import "./styling.scss";
import { SiteMetaData } from "@/components/SiteMetaData";
import { GeneralError } from "@/components/Error/GeneralError";

type LayoutProps = { children: React.ReactNode; }

export default function RootLayout(props: Readonly<LayoutProps>) {
  const { children } = props

  return (
    <html lang="en">
      <ErrorBoundary dev fallBack={<GeneralError />}>
        <head>
          <SiteMetaData />
        </head>
        <body>
          <NavBarWrapper />

          {children}

          <Footer />
        </body>
      </ErrorBoundary>
    </html >
  );
}
