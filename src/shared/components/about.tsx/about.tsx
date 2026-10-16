import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import SecHeader from '@/features/main/shared/sec-header';
import SecTitle from '@/features/main/shared/sec-title';

import SectionBgWord from '@/features/main/shared/sec-bg-word';
import aboutImage from '@/assets/about.png';
import aboutImage2 from '@/assets/about2.png';
import aboutImage3 from '@/assets/about3.png';

export default function AboutSection() {
  const { t } = useTranslation();

  const featureList = [
    'personal-trainer',
    'cardio-programs',
    'quality-equipment',
    'healthy-nutrition',
  ].map((key) => ({
    key,
    title: t(`about-us.features.${key}.title`),
    description: t(`about-us.features.${key}.description`),
  }));

  return (
    <main className="min-h-screen overflow-hidden bg-bg-plain px-4 pt-28 pb-12 text-[#1d1d1f] md:px-10 lg:px-20 lg:pt-32">
      <div className="mx-auto grid max-w-360 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* image collage keeps its proportions at every width */}
        <div className="relative mx-auto aspect-5/6 w-full max-w-150">
          <div className="absolute start-0 top-0 h-[72%] w-[58%] overflow-hidden rounded-[30px] bg-bg-plain shadow-[0_40px_70px_rgba(32,24,22,0.18)]">
            <img
              src={aboutImage}
              alt={t('about-us.images.kettlebell')}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute end-0 top-[10%] h-[24%] w-[38%] overflow-hidden rounded-[28px] bg-bg-plain shadow-[0_25px_50px_rgba(32,24,22,0.15)]">
            <img
              src={aboutImage2}
              alt={t('about-us.images.after-workout')}
              className="h-full w-full object-cover object-left"
            />
          </div>

          <div className="absolute end-0 bottom-0 h-[58%] w-[58%] overflow-hidden rounded-[30px] bg-bg-plain shadow-[0_35px_60px_rgba(32,24,22,0.16)]">
            <img
              src={aboutImage3}
              alt={t('about-us.images.dark-gym')}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <div className="">
          <div className="relative pt-10 pb-10 md:pt-14">
            {/* big outlined word */}
            <SectionBgWord className="top-0 left-0 z-0 translate-x-0 rtl:right-0 rtl:left-auto text-6xl tracking-normal sm:text-7xl md:text-9xl lg:text-8xl xl:text-9xl [-webkit-text-stroke:2px_rgba(0,0,0,0.18)] mask-[linear-gradient(to_bottom,black_30%,transparent)]">
              {t('main.workouts.bg-word')}
            </SectionBgWord>
            <SecHeader
              titleKey="sec-header.about-us"
              className="relative z-10 items-center ps-4"
              titleClassName="pt-0 text-xl md:text-2xl"
            />
          </div>
          <SecTitle translationKey="why-us.sec-title.about-us" />
          <p className="font-rubik pb-4 md:pb-10 text-lg leading-7 text-text-plain">
            {t('about-us.description')}
          </p>

          {/* Features Grid */}
          <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
            {featureList.map((feature) => (
              <div key={feature.key} className="flex items-start gap-3">
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_6_224)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.687 11.1455C20.963 12.8694 17.8841 12.9329 16.2285 11.2773L15.5497 10.5985L14.1355 12.0127L14.8143 12.6915C16.0185 13.8957 17.6982 14.4751 19.3911 14.4413L10.6662 23.1663L12.0238 24.524L20.7488 15.799C20.7149 17.4919 21.2944 19.1716 22.4986 20.3758L23.1774 21.0546L24.5916 19.6404L23.9128 18.9616C22.2572 17.3059 22.3207 14.2271 24.0446 12.5032L24.7517 11.7961L23.3941 10.4384L22.687 11.1455Z"
                      fill="#FF4100"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6_224">
                      <rect
                        width="25"
                        height="24"
                        fill="white"
                        transform="translate(0 17.6777) rotate(-45)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <div>
                  <h3 className="mb-1 text-base font-bold text-text-plain uppercase tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-muted">{feature.description}</p>
                </div>
              </div>
            ))}
            <div>
              <Button variant="outline" icon={<ArrowUpRight />}>
                {t('about-us.explore-more')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
