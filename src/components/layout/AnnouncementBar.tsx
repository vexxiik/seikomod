"use client";

import { useTranslations } from "next-intl";

export function AnnouncementBar() {
  const t = useTranslations('Announcement');

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-xs sm:text-sm font-medium tracking-wide">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <span>{t('text')}</span>
        <span className="bg-white/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">{t('code')}</span>
      </div>
    </div>
  );
}
