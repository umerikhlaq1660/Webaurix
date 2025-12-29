import React from "react";
import { Helmet } from "react-helmet";

const Seo = ({
  title = "Webaurix | Aura That Redefines Tech",
  description = "Webaurix is a technology company providing web development, AI solutions, and digital transformation services.",
  url = "https://www.webaurix.com/",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />

      <link rel="icon" type="image/png" href="/webnetix/public/Favicon.png" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content="/og-image.png" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default Seo;
