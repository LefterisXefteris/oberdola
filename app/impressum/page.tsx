import type { Metadata } from "next";
import { LegalPage } from "../LegalPage";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: true, follow: true },
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <LegalPage eyebrow="Anbieterkennzeichnung" title="Impressum">
      <section>
        <h2>Angaben gemäß § 5 DDG</h2>
        <address>
          Bektas Saridas<br />
          Vogteier Imbiss<br />
          Mühlhäuser Str. 1<br />
          99986 Vogtei-Oberdorla<br />
          Deutschland
        </address>
      </section>
      <section>
        <h2>Kontakt</h2>
        <p>
          Telefon: <a href="tel:+4915231302228">0152 31302228</a><br />
          E-Mail: <a href="mailto:birgulsaridas@gmail.com">birgulsaridas@gmail.com</a>
        </p>
      </section>
      <section>
        <h2>Verantwortlich für den Inhalt</h2>
        <p>
          Bektas Saridas<br />
          Mühlhäuser Str. 1<br />
          99986 Vogtei-Oberdorla
        </p>
      </section>
      <section>
        <h2>Verbraucherstreitbeilegung</h2>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>
    </LegalPage>
  );
}
