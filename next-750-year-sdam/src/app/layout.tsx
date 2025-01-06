import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import "./styling.scss";

type LayoutProps = { children: React.ReactNode; }

export default function RootLayout(props: Readonly<LayoutProps>) {
  const { children } = props

  return (
    <html lang="en">
      <head>
        <title>Ode aan Schiedam</title>
        <link rel="icon" href={`./favicon.png`} type="image/png" />
      </head>
      <body>

        <NavBar />

        {children}

        <Footer />

      </body>
    </html>
  );
}
