import axiosInstance from '@/lib/axios';
import type { TMuscleGroupsResponse, TMusclesByGroupResponse } from '../types/muscle';

export const getMuscleGroups = async (lang: string): Promise<TMuscleGroupsResponse> => {
  const res = await axiosInstance.get('/muscles', {
    headers: { 'accept-language': lang },
  });
  return res.data;
};

export const getMusclesByGroup = async (
  groupId: string,
  lang: string
): Promise<TMusclesByGroupResponse> => {
  const res = await axiosInstance.get(`/musclesGroup/${groupId}`, {
    headers: { 'accept-language': lang },
  });
  return res.data;
};
