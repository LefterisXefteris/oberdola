import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: {
      default: "Vogteier Imbiss · Oberdorla",
      template: "%s · Vogteier Imbiss",
    },
    description:
      "Döner, Pizza und mehr in Oberdorla. Speisekarte ansehen und per WhatsApp oder Telefon bestellen.",
    applicationName: "Vogteier Imbiss",
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
    },
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: "Vogteier Imbiss",
      title: "Vogteier Imbiss · Oberdorla",
      description: "Döner, der Oberdorla bewegt.",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: "Vogteier Imbiss – Döner, der Oberdorla bewegt.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Vogteier Imbiss · Oberdorla",
      description: "Döner, der Oberdorla bewegt.",
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
