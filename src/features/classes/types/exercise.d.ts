export interface IExercise {
  _id: string;
  exercise: string;
  difficulty_level: string;
  target_muscle_group: string;
  prime_mover_muscle: string;
  secondary_muscle: string | null;
  primary_equipment: string | null;
  secondary_equipment: string | null;
  body_region: string | null;
  force_type: string | null;
  mechanics: string | null;
  movement_pattern_1: string | null;
  movement_pattern_2: string | null;
  movement_pattern_3: string | null;
  primary_exercise_classification: string | null;
  posture: string | null;
  short_youtube_demonstration_link: string | null;
  in_depth_youtube_explanation_link: string | null;
}

export interface IExercisesResponse {
  message: string;
  totalExercises: number;
  totalPages: number;
  currentPage: number;
  exercises: IExercise[];
}
export interface IExercisesByMuscleDifficultyParams {
  primeMoverMuscleId: string;
  difficultyLevelId: string;
  lang?: string;
}
export interface IRandomExercisesParams {
  targetMuscleGroupId?: string;
  difficultyLevelId?: string;
  limit?: number;
  lang?: string;
}

export interface IFilterOption {
  _id: string;
  name: string;
}
