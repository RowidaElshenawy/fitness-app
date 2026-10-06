import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import SecHeader from '../sec-header';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import workoutsBg from '@/assets/workouts-bg.png';
import { useMuscleGroups } from '@/features/main/hooks/use-muscle-groups';
import { useMusclesByGroup } from '@/features/main/hooks/use-muscles-by-group';
import WorkoutsCarousel from './workouts-carousel';

function TabsSkeleton() {
  return (
    <div className="flex justify-center gap-4">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="h-10 w-24 animate-pulse rounded-full bg-bg-soft" />
      ))}
    </div>
  );
}

function CardsSkeleton() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          className={cn(
            'aspect-square w-full animate-pulse rounded-2xl bg-bg-soft',
            i === 1 && 'hidden md:block',
            i === 2 && 'hidden lg:block'
          )}
        />
      ))}
    </div>
  );
}

export default function Workouts() {
  //translation
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { locale } = useParams();
  //state
  const [selectedId, setSelectedId] = useState<string>();
  //queries
  const groups = useMuscleGroups();
  const activeId = selectedId ?? groups.data?.[0]?._id;
  const muscles = useMusclesByGroup(activeId);

  const isError = groups.isError || muscles.isError;
  const handleRetry = () => {
    if (groups.isError) groups.refetch();
    if (muscles.isError) muscles.refetch();
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${workoutsBg})` }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-14 h-104 bg-bg-overlay backdrop-blur-[86px] dark:bg-bg-white-faint"
      />

      {/* big outlined word */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-2 h-16 w-full overflow-visible select-none"
      >
        <defs>
          <linearGradient id="workouts-bg-word-stroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="22%" stopColor="#232425" />
          </linearGradient>
        </defs>
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fill="none"
          stroke="url(#workouts-bg-word-stroke)"
          strokeWidth={1}
          strokeOpacity={0.5}
          className="text-4xl font-bold tracking-wide uppercase md:text-[54px]"
        >
          {t('main.workouts.bg-word')}
        </text>
      </svg>
      <div className="relative z-10 mx-auto max-w-360 px-4 pt-9 pb-8 md:px-20">
        <SecHeader title={t('main.workouts.badge')} className="justify-center" />

        <h2 className="mx-auto mt-8 max-w-2xl text-center text-3xl leading-tight font-bold text-text-plain uppercase md:text-[40px]">
          <Trans
            i18nKey="main.workouts.title"
            components={{ highlight: <span className="text-text-primary" /> }}
          />
        </h2>

        <div className="mt-9 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {groups.isPending ? (
            <TabsSkeleton />
          ) : (
            <div role="tablist" className="mx-auto flex w-max gap-2 md:gap-4">
              {groups.data?.map((group) => {
                const active = group._id === activeId;
                return (
                  <Button
                    key={group._id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedId(group._id)}
                    className={cn(
                      'shrink-0 px-4 text-base font-semibold',
                      !active && 'bg-transparent text-text-plain hover:bg-bg-primary-fade'
                    )}
                  >
                    {group.name}
                  </Button>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-8">
          {isError ? (
            <div className="flex flex-col items-center gap-4 py-16 text-text-plain">
              <p>{t('main.workouts.error')}</p>
              <Button variant="outline" onClick={handleRetry}>
                {t('main.workouts.retry')}
              </Button>
            </div>
          ) : groups.isPending || muscles.isPending ? (
            <CardsSkeleton />
          ) : muscles.data.length === 0 ? (
            <p className="py-16 text-center text-text-plain">{t('main.workouts.empty')}</p>
          ) : (
            // key => carousel resets to page 1 when the group changes
            <WorkoutsCarousel
              key={activeId}
              items={muscles.data}
              onExplore={() => navigate(`/${locale}/classes`)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
