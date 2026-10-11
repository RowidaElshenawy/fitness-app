import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import LayoutBackground from '@/shared/components/auth/layout-background';

function ArrowBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`grid size-6 place-items-center rounded-full border border-white/70 ${className}`}
    >
      <ArrowUpRight className="size-3.5" aria-hidden />
    </span>
  );
}

export default function NotFound() {
  const { t, i18n } = useTranslation();
  const { locale } = useParams();

  // Prefer the locale in the URL, then the active i18n language
  const lng = locale ?? i18n.resolvedLanguage ?? 'en';

  useEffect(() => {
    document.title = `404 | ${t('not-found.title-plain')}`;
  }, [t, i18n.resolvedLanguage]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-neutral-900 text-white">
      <LayoutBackground />

      <main className="relative z-10 grid flex-1 place-items-center px-6 py-20">
        {/* Outlined 404 watermark, like the "About Us" outline title */}
        <span
          aria-hidden
          dir="ltr"
          className="pointer-events-none col-start-1 row-start-1 select-none text-[clamp(9rem,32vw,24rem)] leading-none font-extrabold text-text-muted opacity-20 [-webkit-text-stroke:2px_var(--color-brand)]"
        >
          404
        </span>

        <div className="relative z-10 col-start-1 row-start-1 flex max-w-xl flex-col items-center text-center text-text-primary">
          <h1 className="text-4xl leading-tight font-bold uppercase sm:text-5xl rtl:leading-snug">
            <Trans
              i18nKey="not-found.title"
              components={{ highlight: <span className="text-brand" /> }}
            />
          </h1>

          <p className="mt-5 border-s-2 border-brand ps-3 text-start text-sm leading-relaxed text-text-inverse">
            {t('not-found.description')}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to={`/${lng}`}
              className="inline-flex items-center gap-2 rounded-full bg-brand py-2 ps-5 pe-2 text-[16px] font-semibold text-text-primary transition-colors hover:bg-brand/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t('not-found.back-home')}
              <ArrowBadge className="rtl:-scale-x-100" />
            </Link>

            <Link
              to={`/${lng}/classes`}
              className="inline-flex items-center gap-2 rounded-full border border-brand py-2 ps-5 pe-2 text-[16px] font-semibold text-white transition-colors hover:bg-brand/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t('not-found.explore-classes')}
              <ArrowBadge className="border-brand rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
