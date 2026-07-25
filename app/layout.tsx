import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { siteUrl } from "./site-config";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(host.startsWith("localhost") ? `${protocol}://${host}` : siteUrl);

  return {
    metadataBase,
    title: {
      default: "Döner & Pizza in Oberdorla bei Mühlhausen | Vogteier Imbiss",
      template: "%s | Vogteier Imbiss Oberdorla",
    },
    description:
      "Döner, Pizza und Essen zum Mitnehmen in Oberdorla bei Mühlhausen und Niederdorla. Speisekarte ansehen, per WhatsApp bestellen oder liefern lassen.",
    applicationName: "Vogteier Imbiss",
    category: "Restaurant",
    alternates: {
      canonical: siteUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
    openGraph: {
      type: "website",
      locale: "de_DE",
      url: siteUrl,
      siteName: "Vogteier Imbiss",
      title: "Döner & Pizza in Oberdorla bei Mühlhausen | Vogteier Imbiss",
      description:
        "Döner, Pizza, Abholung und Heimservice für Oberdorla, Niederdorla, Mühlhausen und die Vogtei.",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Vogteier Imbiss in Oberdorla – Döner, Pizza und Heimservice",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Döner & Pizza in Oberdorla bei Mühlhausen | Vogteier Imbiss",
      description:
        "Speisekarte, Abholung und Heimservice für Oberdorla, Niederdorla, Mühlhausen und die Vogtei.",
      images: ["/og.png"],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ef1f2f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
