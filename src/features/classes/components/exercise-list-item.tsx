import workoutsBg from '@/assets/workouts-bg.png';
import SidebarListItem from '@/features/main/shared/sidebar-list-item';
import type { IExercise } from '../types/exercise';

function getYouTubeThumbnail(url: string | null): string | null {
  if (!url) return null;

  const match =
    url.match(/youtu\.be\/([^?&/]+)/) ??
    url.match(/[?&]v=([^&]+)/) ??
    url.match(/youtube\.com\/(?:shorts|embed)\/([^?&/]+)/);

  return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null;
}

interface ExerciseListItemProps {
  exercise: IExercise;
  active: boolean;
  onSelect: (id: string) => void;
  showPlayIcon?: boolean;
}

export default function ExerciseListItem({ exercise, active, onSelect }: ExerciseListItemProps) {
  const thumbnail =
    getYouTubeThumbnail(exercise.short_youtube_demonstration_link) ??
    getYouTubeThumbnail(exercise.in_depth_youtube_explanation_link) ??
    workoutsBg;

  return (
    <SidebarListItem
      image={thumbnail}
      title={exercise.exercise}
      subtitle={exercise.primary_equipment}
      active={active}
      onSelect={() => onSelect(exercise._id)}
      action={true}
    />
  );
}
