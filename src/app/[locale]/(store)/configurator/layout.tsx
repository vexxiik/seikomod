import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Konfigurátor hodinek',
  description: 'Sestavte si vlastní hodinky Seiko přesně podle svých představ. V našem konfigurátoru si vyberete prémiové díly a spolehnete se na nezničitelný originální strojek Seiko NH35.',
  keywords: ['konfigurátor hodinek', 'vlastní hodinky Seiko', 'Seiko Datejust mod', 'Seiko Nautilus mod', 'Seiko diver mod', 'Originální strojek Seiko NH35'],
};

export default function ConfiguratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
