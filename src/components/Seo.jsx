import React from "react";
import { Helmet } from "react-helmet-async";

const SITE = "https://webaurix.com";
const DEFAULT_IMG = `${SITE}/og-image.png`;

/* Regions we explicitly target. Same English content serves all of them,
   so every hreflang points at the same canonical URL + an x-default. */
const HREFLANGS = ["en", "en-US", "en-GB", "en-PK", "en-KR"];

/**
 * Reusable SEO head component.
 *
 * Props:
 *   title       – page <title> (also OG/Twitter title)
 *   description – meta description
 *   keywords    – comma-separated keyword string
 *   path        – page path, e.g. "/contact" (used for canonical + og:url)
 *   url         – full canonical URL (overrides `path` if provided)
 *   image       – absolute OG image URL
 *   type        – og:type ("website" | "article")
 *   noindex     – if true, robots won't index this page
 *   schema      – a JSON-LD object (or array) to inject as structured data
 */
const Seo = ({
  title = "Webaurix | Web Development, AI Solutions & Digital Agency",
  description = "Webaurix is a digital agency delivering web development, AI chatbots, mobile apps, UI/UX design, and digital transformation.",
  keywords,
  path = "/",
  url,
  image = DEFAULT_IMG,
  type = "website",
  noindex = false,
  schema,
}) => {
  const canonical = url || `${SITE}${path}`;
  const schemaList = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <Helmet>
      {/* primary */}
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={canonical} />

      {/* hreflang — multi-region targeting (PK, KR, US, UK + global English) */}
      {!noindex &&
        HREFLANGS.map((lang) => (
          <link key={lang} rel="alternate" hrefLang={lang} href={canonical} />
        ))}
      {!noindex && <link rel="alternate" hrefLang="x-default" href={canonical} />}

      {/* icon */}
      <link rel="icon" type="image/png" href="/logo-icon.png" />

      {/* Open Graph */}
      <meta property="og:site_name" content="Webaurix" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_GB" />
      <meta property="og:locale:alternate" content="en_PK" />
      <meta property="og:locale:alternate" content="ko_KR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* structured data */}
      {schemaList.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
