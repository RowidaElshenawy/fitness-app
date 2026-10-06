import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import workoutsBg from '@/assets/workouts-bg.png';
import { useMuscleGroups } from '@/features/main/hooks/use-muscle-groups';
import { useMusclesByGroup } from '@/features/main/hooks/use-muscles-by-group';
import WorkoutsCarousel from './workouts-carousel';
import SecHeader from '../../shared/sec-header';
import SecTitle from '../../shared/sec-title';
import SectionBgWord from '../../shared/sec-bg-word';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import TabsSkeleton from '../../skeleton/tabs-skeleton';
import CardsSkeleton from '../../skeleton/cards-skeleton';

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
      className="relative isolate w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${workoutsBg})` }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-14 z-0 h-104 bg-white/60 backdrop-blur-md dark:bg-[#242424]/60"
      />

      {/* big outlined word */}

      <SectionBgWord>{t('main.workouts.bg-word')}</SectionBgWord>

      <div className="relative z-10 mx-auto max-w-360 px-4 pt-12 pb-8 md:px-20">
        <SecHeader titleKey="main.workouts.badge" className="justify-center" />

        <SecTitle
          translationKey="main.workouts.title"
          className="mx-auto mt-8 max-w-2xl text-center text-4xl leading-normal"
        />

        <div className="mt-9 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {groups.isPending ? (
            <TabsSkeleton />
          ) : (
            <Tabs value={activeId} onValueChange={setSelectedId} className="mx-auto w-max">
              <TabsList variant="pill">
                {groups.data?.map((group) => (
                  <TabsTrigger key={group._id} value={group._id}>
                    {group.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
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
