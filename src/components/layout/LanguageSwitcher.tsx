"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1 border">
      <Button
        variant={locale === 'cs' ? 'default' : 'ghost'}
        size="icon"
        className={`w-8 h-8 rounded-full ${locale === 'cs' ? 'shadow-sm' : ''}`}
        onClick={() => switchLanguage('cs')}
        title="Čeština"
      >
        <span className="text-lg">🇨🇿</span>
      </Button>
      <Button
        variant={locale === 'en' ? 'default' : 'ghost'}
        size="icon"
        className={`w-8 h-8 rounded-full ${locale === 'en' ? 'shadow-sm' : ''}`}
        onClick={() => switchLanguage('en')}
        title="English"
      >
        <span className="text-lg">🇬🇧</span>
      </Button>
    </div>
  );
}
