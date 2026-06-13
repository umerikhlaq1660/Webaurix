import React from "react";
import { Helmet } from "react-helmet-async";

const SITE = "https://www.webaurix.com";
const DEFAULT_IMG = `${SITE}/og-image.png`;

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
      <link rel="canonical" href={canonical} />

      {/* icon */}
      <link rel="icon" type="image/png" href="/logo-icon.png" />

      {/* Open Graph */}
      <meta property="og:site_name" content="Webaurix" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_US" />

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
