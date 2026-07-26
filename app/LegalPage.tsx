/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import Link from "next/link";

export function LegalPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <Link href="/" aria-label="Zurück zur Startseite">
          <img src="/vogteier-logo.png" alt="Vogteier Imbiss" width="1197" height="285" />
        </Link>
        <Link href="/">← Zurück zur Speisekarte</Link>
      </header>
      <article>
        <p className="section-kicker">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="legal-content">{children}</div>
      </article>
      <footer className="legal-footer">
        <span>Vogteier Imbiss · Mühlhäuser Str. 1 · 99986 Vogtei-Oberdorla</span>
        <Link href="/">Startseite</Link>
      </footer>
    </main>
  );
}
