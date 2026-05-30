import React from 'react';

export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Seiko Mod Atelier",
        "image": "https://www.seikomodatelier.cz/logo.png",
        "description": "Specializujeme se na prémiový Seiko modding, výrobu hodinek na míru a konfigurace s využitím originálních strojků Seiko a safírových sklíček.",
        "url": "https://www.seikomodatelier.cz",
        "telephone": "+420123456789", 
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Hodinářská 1",
          "addressLocality": "Praha",
          "postalCode": "110 00",
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
        "name": "Prémiové Seiko Mody (Custom Build)",
        "image": "https://www.seikomodatelier.cz/images/seiko-nautilus-mod.jpg",
        "description": "Ručně sestavené hodinky na míru s originálním strojkem Seiko NH35, safírovým sklíčkem a keramickou lunetou.",
        "brand": {
          "@type": "Brand",
          "name": "Seiko Mod Atelier"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://www.seikomodatelier.cz/konfigurator",
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
