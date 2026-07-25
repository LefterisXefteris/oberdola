import type { Metadata } from "next";
import { RestaurantSite } from "./RestaurantSite";

export const metadata: Metadata = {
  title: "Döner, der Oberdorla bewegt",
  description:
    "Vogteier Imbiss in Oberdorla: Döner, Pizza, Salate, Schnitzel und Heimservice. Jetzt Speisekarte entdecken und per WhatsApp bestellen.",
  alternates: {
    canonical: "/",
  },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Vogteier Imbiss",
  image: "/og.png",
  servesCuisine: ["Döner", "Pizza", "Deutsche Imbissküche"],
  priceRange: "€",
  telephone: "+49 152 31302228",
  email: "birgulsaridas@gmail.com",
  menu: "/#speisekarte",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mühlhäuser Straße 1",
    postalCode: "99986",
    addressLocality: "Oberdorla",
    addressCountry: "DE",
  },
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
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <RestaurantSite />
    </>
  );
}
