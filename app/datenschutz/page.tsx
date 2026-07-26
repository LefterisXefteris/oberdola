import type { Metadata } from "next";
import { LegalPage } from "../LegalPage";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: true, follow: true },
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  return (
    <LegalPage eyebrow="Stand: Juli 2026" title="Datenschutz">
      <section>
        <h2>1. Verantwortlicher</h2>
        <address>
          Bektas Saridas · Vogteier Imbiss<br />
          Mühlhäuser Str. 1 · 99986 Vogtei-Oberdorla<br />
          Telefon: <a href="tel:+4915231302228">0152 31302228</a><br />
          E-Mail: <a href="mailto:birgulsaridas@gmail.com">birgulsaridas@gmail.com</a>
        </address>
      </section>
      <section>
        <h2>2. Aufruf dieser Website</h2>
        <p>
          Beim Aufruf dieser Website werden technisch notwendige Verbindungsdaten verarbeitet,
          etwa IP-Adresse, Zeitpunkt, angeforderte Seite, übertragene Datenmenge, Browsertyp und
          Betriebssystem. Die Verarbeitung ist erforderlich, um die Website sicher und zuverlässig
          bereitzustellen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Server-Protokolle werden
          nur so lange gespeichert, wie dies für Betrieb, Sicherheit und Fehleranalyse erforderlich
          ist.
        </p>
      </section>
      <section>
        <h2>3. Keine Cookies oder Analyse</h2>
        <p>
          Diese Website verwendet keine Analyse- oder Marketingdienste, keine Tracking-Pixel und
          keine nicht notwendigen Cookies. Die Menüsuche und Filterung finden ausschließlich in
          deinem Browser statt und werden nicht gespeichert.
        </p>
      </section>
      <section>
        <h2>4. Kontaktaufnahme</h2>
        <p>
          Wenn du uns per Telefon, E-Mail oder WhatsApp kontaktierst, verarbeiten wir die von dir
          mitgeteilten Daten zur Bearbeitung deiner Anfrage oder Bestellung. Rechtsgrundlage ist
          Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen oder vertraglichen Anliegen und ansonsten
          Art. 6 Abs. 1 lit. f DSGVO. Nachrichten werden gelöscht, sobald sie für den jeweiligen
          Zweck nicht mehr benötigt werden und keine gesetzlichen Aufbewahrungspflichten bestehen.
        </p>
      </section>
      <section>
        <h2>5. Externe Links</h2>
        <p>
          Links zu WhatsApp und Google Maps öffnen externe Dienste erst nach deinem Klick. Ab dann
          gelten die Datenschutzbestimmungen des jeweiligen Anbieters. Auf dieser Website werden
          keine Karten, Social-Media-Plugins oder Inhalte dieser Anbieter eingebettet.
        </p>
      </section>
      <section>
        <h2>6. Deine Rechte</h2>
        <p>
          Du hast im gesetzlichen Rahmen das Recht auf Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Außerdem kannst du
          dich bei einer Datenschutzaufsichtsbehörde beschweren. Für die Ausübung deiner Rechte
          genügt eine Nachricht an die oben genannte E-Mail-Adresse.
        </p>
      </section>
    </LegalPage>
  );
}
