import { useQuery } from '@tanstack/react-query';

import { getProfileData } from '../lib/apis/profile-data.api';

export function useProfileData() {
  return useQuery({
    queryKey: ['profile-data'],
    queryFn: getProfileData,
  });
}
