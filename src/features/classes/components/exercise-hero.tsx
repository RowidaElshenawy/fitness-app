import { Play } from 'lucide-react';

import workoutsBg from '@/assets/workouts-bg.png';
import { Carousel, CarouselItem } from '@/shared/components/ui/carousel';
import { useMealCategories } from '@/features/healthy/hooks/use-meal-categories';

import type { IExercise } from '../types/exercise';

import FitnessCard from '@/shared/components/custom-ui/fitness-card';
import MediaHero from '@/features/main/shared/media-hero';

interface ExerciseHeroProps {
  exercise: IExercise;
}

function getYouTubeThumbnail(url: string | null): string | null {
  if (!url) return null;

  const match =
    url.match(/youtu\.be\/([^?&/]+)/) ??
    url.match(/[?&]v=([^&]+)/) ??
    url.match(/youtube\.com\/(?:shorts|embed)\/([^?&/]+)/);

  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

function FeatureItem({ label }: { label: string }) {
  return (
    <div className="flex flex-1 items-center gap-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full border-4 border-white bg-bg-primary md:size-16">
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M20.25 11.0001C17.812 11.0001 15.59 8.77909 15.59 6.34009V5.34009H13.59V6.34009C13.59 8.11409 14.368 9.77809 15.589 11.0001H3.25V13.0001H15.589C14.368 14.2221 13.59 15.8861 13.59 17.6601V18.6601H15.59V17.6601C15.59 15.2211 17.812 13.0001 20.25 13.0001H21.25V11.0001H20.25Z"
            fill="#F3F3F4"
          />
        </svg>
      </span>

      <span className="text-base font-bold text-text-plain md:text-xl">{label}</span>
    </div>
  );
}

function MealRecommendations() {
  const categoriesQuery = useMealCategories();

  const categories = (categoriesQuery.data ?? []).slice(0, 5);

  if (!categories.length) return null;

  return (
    <div className="mt-8">
      <h3 className="mb-5 text-xl font-bold text-text-plain">Recommendation For You</h3>

      <Carousel>
        {categories.map((cat) => (
          <CarouselItem key={cat.idCategory} className="w-52 md:w-64">
            <FitnessCard
              title={cat.strCategory}
              actionLabel="Read More"
              image={cat.strCategoryThumb}
            />
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
}

export default function ExerciseHero({ exercise }: ExerciseHeroProps) {
  const videoUrl =
    exercise.short_youtube_demonstration_link || exercise.in_depth_youtube_explanation_link;

  const thumbnail =
    getYouTubeThumbnail(exercise.short_youtube_demonstration_link) ??
    getYouTubeThumbnail(exercise.in_depth_youtube_explanation_link) ??
    workoutsBg;

  const description = [exercise.target_muscle_group, exercise.prime_mover_muscle, exercise.posture]
    .filter(Boolean)
    .join(' · ');

  const features = [
    exercise.movement_pattern_1,
    exercise.mechanics,
    exercise.primary_exercise_classification ?? exercise.force_type,
  ].filter((value): value is string => Boolean(value));

  return (
    <div>
      <MediaHero
        key={exercise._id}
        image={thumbnail}
        title={exercise.exercise}
        description={
          <p className="leading-relaxed">
            {description}

            {exercise.primary_equipment && `. Equipment: ${exercise.primary_equipment}.`}
          </p>
        }
        mediaAction={
          videoUrl ? (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch ${exercise.exercise}`}
              className="flex size-18 items-center justify-center rounded-full border-8 border-bg-primary/40 bg-bg-primary text-white shadow-lg transition-transform hover:scale-110"
            >
              <Play size={28} fill="currentColor" className="ms-1" />
            </a>
          ) : undefined
        }
        footer={
          <div className="flex flex-wrap items-center justify-between gap-3">
            {(exercise.body_region || exercise.target_muscle_group) && (
              <span className="rounded-full border border-white/40 px-4 py-1.5 text-sm font-medium text-white">
                {exercise.body_region ?? exercise.target_muscle_group}
              </span>
            )}

            {exercise.difficulty_level && (
              <span className="rounded-full border border-bg-primary px-4 py-1.5 text-sm font-semibold text-bg-primary">
                {exercise.difficulty_level}
              </span>
            )}
          </div>
        }
      />

      {features.length > 0 && (
        <div className="mt-6 flex flex-col gap-4 rounded-xl bg-bg-soft/60 p-4 sm:flex-row">
          {features.map((feature, index) => (
            <FeatureItem key={`${feature}-${index}`} label={feature} />
          ))}
        </div>
      )}

      <MealRecommendations />
    </div>
  );
}
