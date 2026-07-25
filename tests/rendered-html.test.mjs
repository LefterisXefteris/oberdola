import assert from "node:assert/strict";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the restaurant landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html[^>]*lang="de"/i);
  assert.match(html, /Döner, der/);
  assert.match(html, /Oberdorla/);
  assert.match(html, /0152 31302228/);
  assert.match(html, /Speisekarte/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Vogteier Imbiss/);
  assert.match(html, /Döner &amp; Pizza nahe/);
  assert.match(html, /Niederdorla/);
  assert.match(html, /FAQPage/);
  assert.match(html, /areaServed/);
  assert.match(html, /Essen zum Mitnehmen/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("publishes crawl and discovery routes", async () => {
  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /User-Agent: \*/i);
  assert.match(robots, /Sitemap: https:\/\/vogteierimbiss\.best/);

  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /vogteierimbiss\.best/);
  assert.match(sitemap, /<urlset/);
});

test("renders legal pages with the supplied operator details", async () => {
  for (const pathname of ["/impressum", "/datenschutz"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /Bektas Saridas/);
    assert.match(html, /birgulsaridas@gmail\.com/);
    assert.match(html, /Mühlhäuser Straße 1/);
  }
});

test("ships the required local brand assets", async () => {
  const { access } = await import("node:fs/promises");
  await Promise.all([
    access(new URL("public/og.png", templateRoot)),
    access(new URL("public/vogteier-logo.png", templateRoot)),
    access(new URL("public/favicon.png", templateRoot)),
    access(new URL("public/speisekarte.pdf", templateRoot)),
  ]);
});
