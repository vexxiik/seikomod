import React from 'react';
import { useTranslations } from 'next-intl';

export default function StructuredData() {
  const t = useTranslations('SEO');

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Vexx Watch Atelier",
        "image": "https://www.vexxwatch.cz/og-image.jpg",
        "description": t('defaultDescription'),
        "url": "https://www.vexxwatch.cz",
        "telephone": "+420 604 256 988", 
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Pardubice",
          "addressCountry": "CZ"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "124"
        }
      },
      {
        "@type": "Product",
        "name": t('openGraphTitle'),
        "image": "https://www.vexxwatch.cz/og-image.jpg",
        "description": t('openGraphDescription'),
        "brand": {
          "@type": "Brand",
          "name": "Vexx Watch Atelier"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://www.vexxwatch.cz/configurator",
          "priceCurrency": "CZK",
          "price": "9500",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "89"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
