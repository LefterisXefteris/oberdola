import type { Metadata } from "next";
import { RestaurantSite } from "./RestaurantSite";
import { business, deliveryAreas, localFaqs, siteUrl } from "./site-config";

export const metadata: Metadata = {
  title: {
    absolute: "Döner & Pizza in Oberdorla bei Mühlhausen | Vogteier Imbiss",
  },
  description:
    "Döner, Pizza und Essen zum Mitnehmen in Oberdorla nahe Mühlhausen und Niederdorla. Speisekarte ansehen, per WhatsApp bestellen oder liefern lassen.",
  alternates: {
    canonical: siteUrl,
  },
};

const restaurantId = `${siteUrl}/#restaurant`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: business.name,
      inLanguage: "de-DE",
      publisher: { "@id": restaurantId },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Döner & Pizza in Oberdorla bei Mühlhausen",
      description:
        "Speisekarte, Öffnungszeiten, Abholung und Heimservice des Vogteier Imbiss in Oberdorla.",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": restaurantId },
      inLanguage: "de-DE",
    },
    {
      "@type": "Restaurant",
      "@id": restaurantId,
      name: business.name,
      url: siteUrl,
      image: `${siteUrl}/og.png`,
      logo: `${siteUrl}/vogteier-logo.png`,
      description:
        "Imbiss in Oberdorla mit Döner, Pizza, Burgern, Salaten, Nudeln, Schnitzel, Abholung und Heimservice.",
      servesCuisine: [
        "Döner",
        "Pizza",
        "Burger",
        "Deutsche Imbissküche",
        "Türkische Küche",
      ],
      priceRange: "€",
      telephone: business.telephone,
      email: business.email,
      menu: `${siteUrl}/#speisekarte`,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.streetAddress,
        postalCode: business.postalCode,
        addressLocality: business.addressLocality,
        addressRegion: "Thüringen",
        addressCountry: "DE",
      },
      areaServed: deliveryAreas.map((name) => ({
        "@type": "Place",
        name,
      })),
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "11:00",
          closes: "21:30",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "15:00",
          closes: "21:30",
        },
      ],
      potentialAction: {
        "@type": "OrderAction",
        target:
          "https://wa.me/4915231302228?text=Hallo%20Vogteier%20Imbiss%2C%20ich%20m%C3%B6chte%20gern%20bestellen%3A%20",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: localFaqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <RestaurantSite />
    </>
  );
}
