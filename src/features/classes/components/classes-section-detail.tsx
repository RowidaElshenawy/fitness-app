import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import MuscleGroupTabs from '@/features/main/shared/muscle-group-tabs';
import TabsSkeleton from '@/features/main/skeleton/tabs-skeleton';
import { MealDetailsSkeleton, MealsListSkeleton } from '@/features/main/skeleton/healthy-skeletons';

import { useMuscleGroups } from '@/features/main/hooks/use-muscle-groups';
import { useDifficultyLevels } from '../hooks/use-difficulty-levels';
import { useRandomExercises } from '../hooks/use-random-exercises';

import CardsSkeleton from '@/features/main/skeleton/cards-skeleton';
import ExerciseListItem from './exercise-list-item';
import ExerciseHero from './exercise-hero';

import MasterDetailLayout from '@/features/main/shared/detail-layout';

const EXERCISES_LIMIT = 20;

export default function ClassesSectionDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { locale, groupId } = useParams();

  const groupsQuery = useMuscleGroups();
  const { data: difficulties } = useDifficultyLevels();

  const groups = groupsQuery.data ?? [];

  const activeGroupId = groups.find((group) => group._id === groupId)?._id ?? groupId;

  const [selectedDifficultyId, setSelectedDifficultyId] = useState(
    () => difficulties?.[0]?._id ?? ''
  );
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | undefined>();

  const exercisesQuery = useRandomExercises(activeGroupId, EXERCISES_LIMIT, selectedDifficultyId);

  const exercises = exercisesQuery.data ?? [];

  const activeExerciseId = selectedExerciseId ?? exercises[0]?._id;

  const activeExercise = exercises.find((exercise) => exercise._id === activeExerciseId);

  const isError = groupsQuery.isError || exercisesQuery.isError;

  const isLoading = groupsQuery.isPending || exercisesQuery.isPending;

  const handleGroupChange = (newGroupId: string) => {
    setSelectedExerciseId(undefined);
    navigate(`/${locale ?? 'en'}/classes/${newGroupId}`);
  };

  const handleDifficultyChange = (id: string) => {
    setSelectedDifficultyId(id);
    setSelectedExerciseId(undefined);
  };

  return (
    <MasterDetailLayout
      bgWord={t('main.classes.bg-word')}
      header={<MuscleGroupTabs value={activeGroupId} onChange={handleGroupChange} />}
      sidebarHeader={
        !difficulties?.length ? (
          <TabsSkeleton />
        ) : (
          <Tabs
            value={selectedDifficultyId}
            onValueChange={handleDifficultyChange}
            className="w-max min-w-full"
          >
            <TabsList variant="pill">
              {difficulties.map((level) => (
                <TabsTrigger key={level._id} value={level._id}>
                  {level.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )
      }
      sidebar={
        <>
          {isError && <CardsSkeleton />}

          {!isError && isLoading && <MealsListSkeleton />}

          {!isError && !isLoading && !exercises.length && (
            <p className="py-16 text-center text-text-plain">{t('main.classes.empty')}</p>
          )}

          {!isError && !isLoading && exercises.length > 0 && (
            <ul>
              {exercises.map((exercise) => (
                <ExerciseListItem
                  key={exercise._id}
                  exercise={exercise}
                  active={exercise._id === activeExerciseId}
                  onSelect={setSelectedExerciseId}
                  showPlayIcon
                />
              ))}
            </ul>
          )}
        </>
      }
    >
      {isError ? (
        <CardsSkeleton />
      ) : isLoading ? (
        <MealDetailsSkeleton />
      ) : activeExercise ? (
        <ExerciseHero exercise={activeExercise} />
      ) : (
        <p className="py-16 text-center text-text-plain">{t('main.classes.empty')}</p>
      )}
    </MasterDetailLayout>
  );
}
