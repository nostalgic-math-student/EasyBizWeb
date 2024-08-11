import "@/styles/globals.css";
import { type Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "EasyBiz Alpha",
  description: "Simple, secure and on the go!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (

        <html lang="en">
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <body className="font-sans">
            <Providers>
            {children}
            </Providers>
          </body>
        </html>

  );
}
