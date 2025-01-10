import { NavBarWrapper } from "@/components/NavBarWrapper";
import { Footer } from "@/components/Footer";
import "./styling.scss";
import ErrorBoundary from "../components/ErrorBoundary";

type LayoutProps = { children: React.ReactNode; }

export default async function RootLayout(props: Readonly<LayoutProps>) {
  const { children } = props

  const _title = "Ode aan Schiedam"
  const _slogan = "Ontdek de verhalen van de stad"
  const _icon = "/uploads/small_SDAM_750_label_RGB_1a11940a09.png"

  return (
    <html lang="en">
      <head>
        <title>{_title}</title>
        <meta name="description" content={_slogan} />
        <meta property="og:title" content={_title} />
        <meta property="og:description" content={_slogan} />
        <meta property="og:image" content={`http://localhost:1337${_icon}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={_title} />
        <meta name="twitter:description" content={_slogan} />
        <meta name="twitter:image" content={`http://localhost:1337${_icon}`} />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        <link rel="icon" href={`http://localhost:1337${_icon}`} type="image/png" />
      </head>
      <body>
        <ErrorBoundary>
          <NavBarWrapper />

          {children}

          <Footer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
