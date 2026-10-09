// features/main/components/Hero.tsx
import { useTranslation } from 'react-i18next';

import hero from '@/assets/image/hero.png';
import HeroStats from './hero-stats';
import { Button } from '@/shared/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const { t } = useTranslation('');

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-bg-soft">
      {/* BG*/}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-50 top-0 h-full w-[40%] bg-bg-soft blur-[120px] opacity-90" />

        <div className="absolute left-[20%] top-0 h-full w-[25%] bg-bg-primary-fade  blur-[130px]" />

        <div className="absolute -right-20 bottom-0 h-[70%] w-[45%]  bg-[#5b5c5d] blur-[140px] opacity-70" />
      </div>

      <div className="mx-auto grid min-h-screen max-w-7xl  items-center gap-10 px-6 pt-24 md:grid-cols-2">
        {/* text*/}
        <div className="space-y-8 ">
          <h1 className="text-4xl font-bold text-text-plain md:text-5xl">
            {t('main.header.hero.title.part1')}
            <span className="text-text-primary">{t('main.header.hero.title.highlight1')}</span>
            <br />
            <span className="text-text-primary">{t('main.header.hero.title.highlight2')}</span>
            {t('main.header.hero.title.part2')}
          </h1>

          <p className="max-w-md border-s-4 border-border-primary ps-3 text-sm leading-relaxed text-neutral-800">
            {t('main.header.hero.description')}
          </p>

          <HeroStats />

          <div className="flex gap-20 justify-center md:justify-start ">
            <Button size="lg" icon={<ArrowUpRight />}>
              {t('getStarted')}
            </Button>
            <Button variant="outline" size="lg" icon={<ArrowUpRight />}>
              {t('exploreMore')}
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <img src={hero} alt="Fitness trainer" className="max-h-[80vh] w-auto object-contain" />
        </div>
      </div>
    </section>
  );
}
