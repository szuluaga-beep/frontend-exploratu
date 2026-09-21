import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { ConditionalNavbar } from "@/components/ConditionalNavbar";
import { ConditionalMain } from "@/components/ConditionalMain";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FCFCFC" },
    { media: "(prefers-color-scheme: dark)", color: "#1E1E1E" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <ConditionalNavbar />
            <ConditionalMain>{children}</ConditionalMain>
            <footer className="w-full flex items-center justify-center py-3">
              <a
                className="flex items-center gap-1 text-current no-underline"
                href="https://heroui.com?utm_source=next-app-template"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-muted">Powered by</span>
                <p className="text-accent">HeroUI</p>
              </a>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
