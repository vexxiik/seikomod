import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css"; // Fixed path since we moved down one folder

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

import StructuredData from "@/components/seo/StructuredData";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getMessages({ locale });
  const seo = (t as any).SEO;

  return {
    metadataBase: new URL('https://www.vexxwatch.cz'),
    title: {
      template: '%s | Vexx Watch Atelier',
      default: seo.defaultTitle,
    },
    description: seo.defaultDescription,
    keywords: seo.keywords.split(', '),
    openGraph: {
      title: seo.openGraphTitle,
      description: seo.openGraphDescription,
      url: 'https://www.vexxwatch.cz',
      siteName: 'Vexx Watch Atelier',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Vexx Watch Atelier',
        },
      ],
      locale: locale === 'cs' ? 'cs_CZ' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.openGraphTitle,
      description: seo.openGraphDescription,
    },
    alternates: {
      canonical: 'https://www.vexxwatch.cz',
      languages: {
        'cs': '/cs',
        'en': '/en',
      },
    },
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <StructuredData />
          <Providers>
            {children}
          </Providers>
          <SpeedInsights />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
