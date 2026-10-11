import axios from 'axios';

import type {
  TMuscleGroup,
  TMuscle,
  TMuscleGroupsResponse,
  TMusclesByGroupResponse,
} from '../types/muscle';

const API_URL = import.meta.env.VITE_API_URL;

export async function getMuscleGroups(lang: string): Promise<TMuscleGroup[]> {
  const { data } = await axios.get<TMuscleGroupsResponse>(`${API_URL}/muscles`, {
    headers: {
      'Accept-Language': lang,
    },
  });

  return data.musclesGroup ?? [];
}

export async function getMusclesByGroup(groupId: string, lang: string): Promise<TMuscle[]> {
  const { data } = await axios.get<TMusclesByGroupResponse>(`${API_URL}/musclesGroup/${groupId}`, {
    headers: {
      'Accept-Language': lang,
    },
  });

  return data.muscles ?? [];
}
