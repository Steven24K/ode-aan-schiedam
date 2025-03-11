import { NavBar } from "@/components/NavBarWrapper";
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
      <head>
        <SiteMetaData />
      </head>
      <body>
        <ErrorBoundary dev fallBack={<GeneralError />}>
          <NavBar />

          <main>
            {children}
          </main>

          <Footer />
        </ErrorBoundary>
      </body>
    </html >
  );
}
