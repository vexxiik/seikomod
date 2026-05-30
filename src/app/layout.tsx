import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

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
    template: '%s | Seiko Mod Atelier',
    default: 'Seiko Mod Atelier | Prémiové hodinky na míru & Seiko Modding CZ',
  },
  description: 'Specializujeme se na stavbu prémiových hodinek na míru. Nabízíme unikátní Seiko mody osazené originálními strojky Seiko a špičkovými aftermarket díly. Vytvořte si svůj originál.',
  keywords: ['Seiko mod', 'Seiko modding CZ', 'hodinky na míru', 'vlastní hodinky Seiko', 'prémiové díly na hodinky'],
  openGraph: {
    title: 'Seiko Mod Atelier | Prémiové hodinky na míru',
    description: 'Váš osobní hodinář. Stavíme unikátní Seiko mody s důrazem na detail a kvalitu materiálů z chirurgické oceli a safíru.',
    url: 'https://www.seikomodatelier.cz',
    siteName: 'Seiko Mod Atelier',
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
    title: 'Seiko Mod Atelier | Prémiové hodinky na míru',
    description: 'Specializujeme se na stavbu prémiových hodinek na míru. Vytvořte si svůj originál v našem konfigurátoru.',
  },
  alternates: {
    canonical: 'https://www.seikomodatelier.cz',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <StructuredData />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
