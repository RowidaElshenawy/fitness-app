import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import SecHeader from '@/features/main/shared/sec-header';
import SecTitle from '@/features/main/shared/sec-title';
import { useTranslation } from 'react-i18next';

export default function AboutSection() {
  const { t } = useTranslation();
  const featureList = [
    {
      title: 'Personal Trainer',
      description: 'Achieve your fitness goals with the guidance of our certified trainers.',
    },
    {
      title: 'Cardio Programs',
      description: 'From steady-state runs to interval sprints, our treadmill programs.',
    },
    {
      title: 'Quality Equipment',
      description: 'Our gym is equipped with the latest cardio & strength machines.',
    },
    {
      title: 'Healthy Nutritions',
      description: 'Fuel your fitness journey with customized meal plans for you.',
    },
  ];

  return (
    <main className="min-h-screen bg-bg-plain  px-6 py-12 lg:px-20 lg:py-16">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 pt-10">
        {/* Section Images Container */}
        <div className="relative mx-auto flex sm:h-[650px] h-96 w-full items-center justify-center">
          {/* Main Left Image */}
          <div className="absolute left-0 top-0 h-[85%] w-[55%] overflow-hidden rounded-[24px] bg-bg-plain  shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
              alt="Athlete working out with a kettlebell"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Top Right Small Image */}
          <div className="absolute right-0 top-0 h-[38%] w-[40%] overflow-hidden rounded-[20px] bg-bg-plain  shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80"
              alt="Male athlete posing after a workout"
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Bottom Right Large Image */}
          <div className="absolute bottom-0 right-0 h-[58%] w-[52%] overflow-hidden rounded-[24px] bg-bg-plain  shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=900&q=80"
              alt="Athlete training in a dark gym"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Section Content */}
        <div className="pb-20">
          <div className="relative mb-6">
            <div className="relative pt-6">
              <SecHeader
                titleKey="sec-header.about-us"
                className="text-text-primary font-semibold tracking-wider text-sm mb-2"
              />
              <SecTitle translationKey="why-us.sec-title.why-us" />
            </div>
          </div>

          {/* Description */}
          <p className="pb-8 text-base text-text-muted md:text-lg leading-relaxed">
            {t('why-us.sec-title.description')}
          </p>

          {/* Features Grid */}
          <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
            {featureList.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3">
                <ArrowUpRight className="h-5 w-5 shrink-0 text-text-primary mt-1" />
                <div>
                  <h3 className="mb-1 text-base font-bold text-text-plain uppercase tracking-wide">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-muted">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Button CTA */}
          <div className="mt-8">
            <Button variant="outline" icon={<ArrowUpRight />}>
              {t('why-us.sec-title.exploreMore')}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
