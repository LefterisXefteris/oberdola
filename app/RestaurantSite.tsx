"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import { menuCategories, totalMenuItems } from "./menu-data";
import { localFaqs } from "./site-config";

const phoneHref = "tel:+4915231302228";
const whatsappHref =
  "https://wa.me/4915231302228?text=Hallo%20Vogteier%20Imbiss%2C%20ich%20m%C3%B6chte%20gern%20bestellen%3A%20";
const directionsHref =
  "https://www.google.com/maps/search/?api=1&query=M%C3%BChlh%C3%A4user+Str.+1%2C+99986+Vogtei-Oberdorla%2C+Germany";

const openingStatusScript = String.raw`
  (() => {
    const updateOpeningStatus = () => {
      const parts = new Intl.DateTimeFormat("de-DE", {
        timeZone: "Europe/Berlin",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
      }).formatToParts(new Date());
      const weekday = parts.find((part) => part.type === "weekday")?.value ?? "";
      const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
      const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
      const minutes = hour * 60 + minute;
      const isMonday = weekday.startsWith("Mo");
      const isSunday = weekday.startsWith("So");
      const opensAt = isSunday ? 15 * 60 : 11 * 60;
      const closesAt = 21 * 60 + 30;
      const isOpen = !isMonday && minutes >= opensAt && minutes < closesAt;
      let label = "Heute geschlossen";

      if (isOpen) label = "Geöffnet bis 21:30 Uhr";
      else if (isMonday) label = "Heute Ruhetag";
      else if (minutes < opensAt) {
        label = "Öffnet heute um " + (isSunday ? "15:00" : "11:00") + " Uhr";
      }

      const status = document.querySelector("[data-opening-status]");
      const dot = status?.querySelector("[data-opening-dot]");
      const text = status?.querySelector("[data-opening-label]");
      dot?.classList.toggle("open", isOpen);
      if (text) text.textContent = label;
    };

    updateOpeningStatus();
    window.setInterval(updateOpeningStatus, 60_000);
  })();
`;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function RestaurantSite() {
  const [activeCategory, setActiveCategory] = useState("alle");
  const [query, setQuery] = useState("");
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const categoryTabsRef = useRef<HTMLDivElement>(null);
  const menuResultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    window.scrollTo(0, 0);
    const frame = window.requestAnimationFrame(() => window.scrollTo(0, 0));

    return () => {
      window.cancelAnimationFrame(frame);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const visibleCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("de-DE");
    return menuCategories
      .filter((category) => activeCategory === "alle" || category.slug === activeCategory)
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          const matchesVegetarian = !vegetarianOnly || item.vegetarian;
          const haystack = `${item.number ?? ""} ${item.name} ${item.description ?? ""}`.toLocaleLowerCase(
            "de-DE",
          );
          return matchesVegetarian && (!normalizedQuery || haystack.includes(normalizedQuery));
        }),
      }))
      .filter((category) => category.items.length > 0);
  }, [activeCategory, query, vegetarianOnly]);

  const visibleCount = visibleCategories.reduce(
    (count, category) => count + category.items.length,
    0,
  );

  const moveToResults = () => {
    window.requestAnimationFrame(() => {
      menuResultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const chooseCategory = (category: string) => {
    setActiveCategory(category);
    moveToResults();
  };

  const resetMenuFilters = () => {
    setQuery("");
    setActiveCategory("alle");
    setVegetarianOnly(false);
    moveToResults();
  };

  const scrollCategoryTabs = (direction: -1 | 1) => {
    categoryTabsRef.current?.scrollBy({
      left: direction * Math.min(460, window.innerWidth * 0.65),
      behavior: "smooth",
    });
  };

  return (
    <>
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Vogteier Imbiss – Startseite">
          <img src="/vogteier-logo.png" alt="Vogteier Imbiss" width="1197" height="285" />
        </a>
        <nav aria-label="Hauptnavigation">
          <a href="#speisekarte">Speisekarte</a>
          <a href="#lieferservice">Lieferung</a>
          <a href="#fragen">Fragen</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
        <a className="header-order" href={whatsappHref} target="_blank" rel="noreferrer">
          Bestellen <Arrow />
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <h1 className="sr-only">
            Vogteier Imbiss – Döner und Pizza in Oberdorla
          </h1>

          <div className="hero-status-row" data-reveal>
            <div className="eyebrow" data-opening-status>
              <span className="status-dot" data-opening-dot suppressHydrationWarning />
              <span data-opening-label suppressHydrationWarning>
                Di–Sa ab 11:00 Uhr · So ab 15:00 Uhr
              </span>
            </div>
            <script dangerouslySetInnerHTML={{ __html: openingStatusScript }} />
          </div>

          <div className="hero-art" data-reveal>
            <img
              src="/og.png"
              alt="Vogteier Imbiss mit Döner und Pizza – Döner, der Oberdorla bewegt"
              width="1200"
              height="630"
            />
            <div className="deal-sticker" aria-label="Dienstagsangebot">
              <span>Dienstag</span>
              <strong>= Dönertag</strong>
              <small>ab 5 € · nur Abholung</small>
            </div>
          </div>

          <div className="hero-utility" data-reveal>
            <p className="hero-lead">
              Dein Imbiss für Döner, Pizza und Essen zum Mitnehmen in Oberdorla –
              nahe Niederdorla und Mühlhausen, auf Wunsch bis vor deine Tür.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href={whatsappHref} target="_blank" rel="noreferrer">
                Per WhatsApp bestellen <Arrow />
              </a>
              <a className="button button-ghost" href={phoneHref}>
                0152 31302228
              </a>
            </div>
            <a className="hero-address" href={directionsHref} target="_blank" rel="noreferrer">
              <span>📍</span>
              <span>Mühlhäuser Str. 1 · 99986 Vogtei-Oberdorla</span>
            </a>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div>
            <span>FRISCH BELEGT</span><b>✦</b><span>HEISS GELIEFERT</span><b>✦</b>
            <span>MITTEN IN OBERDORLA</span><b>✦</b><span>FRISCH BELEGT</span><b>✦</b>
            <span>HEISS GELIEFERT</span><b>✦</b><span>MITTEN IN OBERDORLA</span><b>✦</b>
          </div>
        </div>

        <section className="quick-facts section-shell" aria-label="Öffnungszeiten und Angebot">
          <article className="fact-card fact-hours" data-reveal>
            <span className="card-index">01</span>
            <p className="section-kicker">Öffnungszeiten</p>
            <h2>Wenn der Hunger kommt.</h2>
            <dl>
              <div><dt>Dienstag – Samstag</dt><dd>11:00 – 21:30</dd></div>
              <div><dt>Sonn- & Feiertage</dt><dd>15:00 – 21:30</dd></div>
              <div><dt>Montag</dt><dd>Ruhetag</dd></div>
            </dl>
          </article>
          <article className="fact-card fact-deal" data-reveal>
            <span className="card-index">02</span>
            <p className="section-kicker">Dienstagsdeal</p>
            <h2>Dönertag.</h2>
            <div className="deal-prices">
              <p><span>Normaler Döner</span><strong>6 €</strong></p>
              <p><span>Kleiner Döner</span><strong>5 €</strong></p>
            </div>
            <small>Nur Abholung.</small>
          </article>
          <article className="fact-card fact-delivery" data-reveal>
            <span className="card-index">03</span>
            <p className="section-kicker">Heimservice</p>
            <h2>Wir bringen’s.</h2>
            <p>Lieferzeiten täglich von <strong>11:30 – 21:00 Uhr</strong>.</p>
            <a href="#lieferservice">Liefergebiete ansehen <Arrow /></a>
          </article>
        </section>

        <section className="local-intro section-shell" aria-labelledby="local-heading">
          <div className="local-intro-copy" data-reveal>
            <p className="section-kicker">Imbiss in der Vogtei</p>
            <h2 id="local-heading">
              Döner & Pizza nahe <span>Mühlhausen.</span>
            </h2>
            <p>
              Du suchst einen Imbiss, Döner, Pizza oder Take-away in deiner Nähe?
              Der Vogteier Imbiss liegt in Oberdorla, direkt zwischen Niederdorla
              und Mühlhausen. Bestelle zur Abholung oder nutze unseren Heimservice
              in der Vogtei und den umliegenden Orten.
            </p>
            <div className="local-links">
              <a href="#speisekarte">Speisekarte ansehen <Arrow /></a>
              <a href="#lieferservice">Liefergebiete prüfen <Arrow /></a>
            </div>
          </div>
          <div className="local-areas" data-reveal>
            <p className="section-kicker">Hier sind wir für dich da</p>
            <ul aria-label="Liefergebiete rund um Oberdorla">
              {[
                "Oberdorla",
                "Niederdorla",
                "Mühlhausen",
                "Langula",
                "Felchta",
                "Kammerforst",
                "Oppershausen",
                "Heyerode",
              ].map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="speisekarte" className="menu-section section-shell">
          <div className="section-heading" data-reveal>
            <div>
              <p className="section-kicker">Die ganze Karte · {totalMenuItems} Positionen</p>
              <h2>Finde dein <span>Lieblingsessen.</span></h2>
            </div>
            <a className="pdf-link" href="/speisekarte.pdf" target="_blank">
              Originalkarte als PDF <Arrow />
            </a>
          </div>

          <div className="menu-controls" data-reveal>
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <span className="sr-only">Speisekarte durchsuchen</span>
              <input
                type="search"
                placeholder="Döner, Pizza, Nummer 119 …"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Suche löschen">
                  ×
                </button>
              )}
            </label>
            <button
              type="button"
              className={`veg-toggle ${vegetarianOnly ? "active" : ""}`}
              onClick={() => setVegetarianOnly((value) => !value)}
              aria-pressed={vegetarianOnly}
            >
              <span>●</span> Vegetarisch
            </button>
          </div>

          <div className="menu-navigator" data-reveal>
            <div className="menu-navigator-title">
              <span>Kategorie wählen</span>
              <small>Antippen und direkt losstöbern</small>
            </div>

            <label className="mobile-category-select">
              <span className="sr-only">Menükategorie auswählen</span>
              <select
                value={activeCategory}
                onChange={(event) => chooseCategory(event.target.value)}
                aria-controls="menu-results"
              >
                <option value="alle">Alle Kategorien · {totalMenuItems}</option>
                {menuCategories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.label} · {category.items.length}
                  </option>
                ))}
              </select>
            </label>

            <div className="category-browser">
              <button
                type="button"
                className="category-scroll-button"
                onClick={() => scrollCategoryTabs(-1)}
                aria-label="Vorherige Kategorien anzeigen"
              >
                ←
              </button>
              <div
                className="category-tabs"
                ref={categoryTabsRef}
                role="group"
                aria-label="Menükategorien"
              >
                <button
                  type="button"
                  className={activeCategory === "alle" ? "active" : ""}
                  onClick={() => chooseCategory("alle")}
                  aria-pressed={activeCategory === "alle"}
                  aria-controls="menu-results"
                >
                  Alle <span>{totalMenuItems}</span>
                </button>
                {menuCategories.map((category) => (
                  <button
                    type="button"
                    key={category.slug}
                    className={activeCategory === category.slug ? "active" : ""}
                    onClick={() => chooseCategory(category.slug)}
                    aria-pressed={activeCategory === category.slug}
                    aria-controls="menu-results"
                  >
                    {category.label} <span>{category.items.length}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="category-scroll-button"
                onClick={() => scrollCategoryTabs(1)}
                aria-label="Weitere Kategorien anzeigen"
              >
                →
              </button>
            </div>

            <div className="menu-navigator-meta">
              <p className="result-count" aria-live="polite">
                {visibleCount} {visibleCount === 1 ? "Gericht" : "Gerichte"}
              </p>
              {(activeCategory !== "alle" || query || vegetarianOnly) && (
                <button type="button" className="reset-filters" onClick={resetMenuFilters}>
                  Alles anzeigen
                </button>
              )}
            </div>
          </div>

          <div className="menu-results" id="menu-results" ref={menuResultsRef}>
            {visibleCategories.map((category) => (
              <section className="menu-category" key={category.slug}>
                <div className="menu-category-heading">
                  <h3>{category.label}</h3>
                  {category.note && <p>{category.note}</p>}
                </div>
                <div className="menu-grid">
                  {category.items.map((item, index) => (
                    <article
                      className="menu-card"
                      key={`${category.slug}-${item.number ?? item.name}-${index}`}
                    >
                      <div className="menu-card-main">
                        <div className="menu-name-line">
                          {item.number && <span className="item-number">{item.number}</span>}
                          <h4>{item.name}</h4>
                          {item.vegetarian && <span className="veg-dot" title="Vegetarisch">V</span>}
                        </div>
                        {item.description && <p>{item.description}</p>}
                        {item.markers && <small>KENNZ. {item.markers}</small>}
                      </div>
                      <div className="price-list">
                        {item.prices.map((itemPrice) => (
                          <div key={`${itemPrice.label ?? ""}-${itemPrice.value}`}>
                            {itemPrice.label && <span>{itemPrice.label}</span>}
                            <strong>{itemPrice.value}</strong>
                          </div>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
            {visibleCount === 0 && (
              <div className="empty-state">
                <strong>Nichts gefunden.</strong>
                <p>Versuch einen anderen Suchbegriff oder zeig wieder alle Kategorien.</p>
                <button
                  type="button"
                  onClick={resetMenuFilters}
                >
                  Filter zurücksetzen
                </button>
              </div>
            )}
          </div>

          <div className="allergen-note" data-reveal>
            <div>
              <p className="section-kicker">Kennzeichnungen</p>
              <h3>Allergien? Bitte kurz fragen.</h3>
            </div>
            <p>
              Die Kennzeichnungen wurden aus der gedruckten Karte übernommen. Da Hersteller
              Zutaten ändern können, ruf uns bei Allergien oder Unverträglichkeiten bitte vor
              deiner Bestellung an. Für Druckfehler keine Haftung.
            </p>
            <a href={phoneHref}>Jetzt anrufen <Arrow /></a>
          </div>
        </section>

        <section id="lieferservice" className="delivery-section">
          <div className="delivery-inner section-shell">
            <div className="delivery-intro" data-reveal>
              <p className="section-kicker">Heimservice · 11:30 – 21:00 Uhr</p>
              <h2>Dein Essen.<br /><span>Dein Sofa.</span></h2>
              <p>
                Ruf an oder schick deine Bestellung per WhatsApp. Wir bestätigen dir
                Lieferzeit und Gesamtpreis direkt.
              </p>
              <div className="hero-actions">
                <a className="button button-yellow" href={whatsappHref} target="_blank" rel="noreferrer">
                  WhatsApp öffnen <Arrow />
                </a>
                <a className="button button-outline-light" href={phoneHref}>Anrufen</a>
              </div>
            </div>
            <div className="delivery-prices" data-reveal>
              <div><span>Oberdorla · Niederdorla · Langula</span><strong>16 €</strong></div>
              <div><span>Kammerforst · Oppershausen</span><strong>ab 20 €</strong></div>
              <div><span>Mühlhausen · Felchta · Heyerode</span><strong>ab 20 €</strong></div>
              <div><span>Diedorf · Flarchheim</span><strong>ab 25 €</strong></div>
              <div><span>Mülverstedt · Weberstedt</span><strong>ab 30 €</strong></div>
              <div className="pickup-bonus">
                <span>Selbstabholer-Bonus</span>
                <strong>Ab 50 € Bestellwert gibt’s ein alkoholfreies Getränk gratis.</strong>
              </div>
            </div>
          </div>
        </section>

        <section id="kontakt" className="contact-section section-shell">
          <div className="contact-copy" data-reveal>
            <p className="section-kicker">Komm vorbei</p>
            <h2>Mitten in <span>Oberdorla.</span></h2>
            <address>
              Mühlhäuser Str. 1<br />
              99986 Vogtei-Oberdorla
            </address>
          </div>
          <div className="contact-actions" data-reveal>
            <a href={directionsHref} target="_blank" rel="noreferrer">
              <span>01</span><strong>Route öffnen</strong><Arrow />
            </a>
            <a href={phoneHref}>
              <span>02</span><strong>0152 31302228</strong><Arrow />
            </a>
            <a href="mailto:birgulsaridas@gmail.com">
              <span>03</span><strong>E-Mail schreiben</strong><Arrow />
            </a>
          </div>
        </section>

        <section id="fragen" className="faq-section section-shell" aria-labelledby="faq-heading">
          <div className="faq-heading" data-reveal>
            <p className="section-kicker">Kurz beantwortet</p>
            <h2 id="faq-heading">Häufige Fragen.</h2>
            <p>
              Alles Wichtige zu Standort, Lieferung, Abholung und Öffnungszeiten
              beim Vogteier Imbiss.
            </p>
          </div>
          <div className="faq-list">
            {localFaqs.map((item, index) => (
              <details key={item.question} data-reveal>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.question}
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">Vogteier Imbiss</div>
        <div className="footer-meta">
          <p>© {new Date().getFullYear()} Bektas Saridas</p>
          <p>Döner · Pizza · Abholung · Heimservice in der Vogtei</p>
          <div>
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
          </div>
        </div>
      </footer>

      <div className="mobile-order-bar" aria-label="Schnell bestellen">
        <a href={phoneHref}>Anrufen</a>
        <a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp <Arrow /></a>
      </div>
    </>
  );
}
