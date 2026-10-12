import axios from 'axios';

import type {
  IExercise,
  IExercisesByMuscleDifficultyParams,
  IExercisesResponse,
  IRandomExercisesParams,
} from '../types/exercise';

const API_URL = import.meta.env.VITE_API_URL;

function extractExercises(response: unknown): IExercise[] {
  if (Array.isArray(response)) {
    return response as IExercise[];
  }

  if (response && typeof response === 'object') {
    const result = response as Record<string, unknown>;

    if (Array.isArray(result.exercises)) {
      return result.exercises as IExercise[];
    }

    if (Array.isArray(result.data)) {
      return result.data as IExercise[];
    }

    if (result.data && typeof result.data === 'object') {
      const nested = result.data as Record<string, unknown>;

      if (Array.isArray(nested.exercises)) {
        return nested.exercises as IExercise[];
      }
    }
  }

  throw new Error('Unexpected exercises API response');
}

export async function getExercises(lang = 'en'): Promise<IExercise[]> {
  const { data } = await axios.get<IExercisesResponse>(`${API_URL}/exercises`, {
    headers: {
      'Accept-Language': lang,
    },
  });

  return extractExercises(data);
}

export async function getExercisesByMuscleDifficulty({
  primeMoverMuscleId,
  difficultyLevelId,
  lang = 'en',
}: IExercisesByMuscleDifficultyParams): Promise<IExercise[]> {
  const { data } = await axios.get<unknown>(`${API_URL}/exercises/by-muscle-difficulty`, {
    params: {
      primeMoverMuscleId,
      difficultyLevelId,
    },
    headers: {
      'Accept-Language': lang,
    },
  });

  return extractExercises(data);
}

export async function getRandomExercises({
  targetMuscleGroupId,
  difficultyLevelId,
  limit = 6,
  lang = 'en',
}: IRandomExercisesParams): Promise<IExercise[]> {
  const { data } = await axios.get<unknown>(`${API_URL}/exercises/random`, {
    params: {
      targetMuscleGroupId,
      difficultyLevelId,
      limit,
    },
    headers: {
      'Accept-Language': lang,
    },
  });

  return extractExercises(data);
}
