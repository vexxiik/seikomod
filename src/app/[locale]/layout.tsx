import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/Providers";
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

export const metadata: Metadata = {
  title: {
    template: '%s | Vexx Watch Atelier',
    default: 'Vexx Watch Atelier | Prémiové hodinky na míru & Seiko Modding CZ',
  },
  description: 'Specializujeme se na stavbu prémiových hodinek na míru. Nabízíme unikátní Seiko mody osazené originálními strojky Seiko a špičkovými aftermarket díly. Vytvořte si svůj originál.',
  keywords: ['Seiko mod', 'Seiko modding CZ', 'hodinky na míru', 'vlastní hodinky Seiko', 'prémiové díly na hodinky'],
  openGraph: {
    title: 'Vexx Watch Atelier | Prémiové hodinky na míru',
    description: 'Váš osobní hodinář. Stavíme unikátní Seiko mody s důrazem na detail a kvalitu materiálů z chirurgické oceli a safíru.',
    url: 'https://www.vexxwatchatelier.cz',
    siteName: 'Vexx Watch Atelier',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ukázka prémiových Seiko mod hodinek',
      },
    ],
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vexx Watch Atelier | Prémiové hodinky na míru',
    description: 'Specializujeme se na stavbu prémiových hodinek na míru. Vytvořte si svůj originál v našem konfigurátoru.',
  },
  alternates: {
    canonical: 'https://www.vexxwatchatelier.cz',
  },
};

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
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <StructuredData />
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
