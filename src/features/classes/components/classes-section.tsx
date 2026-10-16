import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import workoutsBg from '@/assets/workouts-bg.png';

import { Button } from '@/shared/components/ui/button';
import { Carousel, CarouselItem } from '@/shared/components/ui/carousel';
import FitnessCard from '@/shared/components/custom-ui/fitness-card';
import MuscleGroupTabs from '@/features/main/shared/muscle-group-tabs';

import { useRandomExercises } from '@/features/classes/hooks/use-random-exercises';
import { useDifficultyLevels } from '@/features/classes/hooks/use-difficulty-levels';
import { useMuscleGroups } from '@/features/main/hooks/use-muscle-groups';

import SectionBgWord from '@/features/main/shared/sec-bg-word';
import SecHeader from '@/features/main/shared/sec-header';
import SecTitle from '@/features/main/shared/sec-title';

import type { IExercise } from '@/features/classes/types/exercise';

const EXERCISES_LIMIT = 6;
const RECOMMENDATION_LIMIT = 5;

function CardsSkeleton({ count }: { count: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="aspect-square w-full animate-pulse rounded-2xl bg-bg-soft" />
      ))}
    </div>
  );
}

function CarouselSkeleton() {
  return (
    <div className="flex gap-6 overflow-hidden px-6">
      {Array.from({ length: RECOMMENDATION_LIMIT }, (_, i) => (
        <div
          key={i}
          className="aspect-square w-60 shrink-0 animate-pulse rounded-2xl bg-bg-soft md:w-72"
        />
      ))}
    </div>
  );
}

function ExerciseCards({
  exercises,
  onExplore,
  actionLabel,
}: {
  exercises: IExercise[];
  onExplore: () => void;
  actionLabel: string;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {exercises.map((exercise) => (
        <FitnessCard
          key={exercise._id}
          image={workoutsBg}
          title={exercise.exercise}
          actionLabel={actionLabel}
          onClick={onExplore}
        />
      ))}
    </div>
  );
}

export default function ClassesSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { locale } = useParams();

  const [selectedGroupId, setSelectedGroupId] = useState<string>();

  const groupsQuery = useMuscleGroups();
  const { data: difficulties } = useDifficultyLevels();

  const groups = groupsQuery.data ?? [];
  const defaultDifficultyId = difficulties?.[0]?._id;

  const activeGroupId = groups.find((g) => g._id === selectedGroupId)?._id ?? groups[0]?._id;

  const exercisesQuery = useRandomExercises(activeGroupId, EXERCISES_LIMIT, defaultDifficultyId);
  const recommendationsQuery = useRandomExercises(
    groups[0]?._id,
    RECOMMENDATION_LIMIT,
    defaultDifficultyId
  );

  const exercises = exercisesQuery.data ?? [];
  const recommendations = recommendationsQuery.data ?? [];

  const handleExplore = () => {
    if (activeGroupId) navigate(`/${locale ?? 'en'}/classes/${activeGroupId}`);
  };

  const renderError = (onRetry: () => void) => (
    <div className="flex flex-col items-center gap-4 py-16 text-text-plain">
      <p>{t('main.classes.error')}</p>
      <Button variant="outline" onClick={onRetry}>
        {t('main.classes.retry')}
      </Button>
    </div>
  );

  const renderEmpty = () => (
    <p className="py-16 text-center text-text-plain">{t('main.classes.empty')}</p>
  );

  const renderExercises = () => {
    if (groupsQuery.isPending || exercisesQuery.isPending)
      return <CardsSkeleton count={EXERCISES_LIMIT} />;
    if (groupsQuery.isError) return renderError(() => groupsQuery.refetch());
    if (!groups.length) return renderEmpty();
    if (exercisesQuery.isError) return renderError(() => exercisesQuery.refetch());
    if (!exercises.length) return renderEmpty();
    return (
      <ExerciseCards
        exercises={exercises}
        onExplore={handleExplore}
        actionLabel={t('main.classes.explore')}
      />
    );
  };

  const renderRecommendations = () => {
    if (!groups.length || groupsQuery.isPending) return null;
    if (recommendationsQuery.isPending)
      return (
        <div className="mt-14">
          <div className="mb-6 h-9 w-64 animate-pulse rounded-lg bg-bg-soft" />
          <CarouselSkeleton />
        </div>
      );
    if (recommendationsQuery.isError || !recommendations.length) return null;
    return (
      <div className="mt-14">
        <h3 className="mb-6 text-2xl font-bold text-text-plain md:text-3xl">
          {t('main.classes.recommendation')}
        </h3>
        <Carousel>
          {recommendations.map((exercise) => (
            <CarouselItem key={exercise._id} className="w-60 md:w-72">
              <FitnessCard
                image={workoutsBg}
                title={exercise.exercise}
                actionLabel={t('main.classes.explore')}
                onClick={handleExplore}
                className="aspect-square"
              />
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    );
  };

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-cover bg-center bg-no-repeat pt-17"
      style={{ backgroundImage: `url(${workoutsBg})` }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-0 h-full bg-bg-plain/60 backdrop-blur-md "
      />

      <SectionBgWord className={'pt-18'}>{t('main.workouts.bg-word')}</SectionBgWord>

      <div className="relative z-10 mx-auto max-w-360 px-4 pt-12 pb-16 md:px-8 xl:px-20 ">
        <SecHeader titleKey="sec-header.fitness-classes" className="justify-center " />

        <SecTitle
          translationKey="why-us.sec-title.fitness-classes"
          className="mx-auto mt-8 max-w-2xl text-center text-3xl leading-normal md:text-4xl"
        />

        <div className="mt-9">
          <MuscleGroupTabs value={activeGroupId} onChange={setSelectedGroupId} />
        </div>

        <div className="mt-8">{renderExercises()}</div>

        {renderRecommendations()}
      </div>
    </section>
  );
}
