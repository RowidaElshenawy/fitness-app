import axios from 'axios';

import type { IProfileResponse } from '../types/profile';

export async function getProfileData(): Promise<IProfileResponse> {
  const { data } = await axios.get<IProfileResponse>(
    `${import.meta.env.VITE_API_URL}/auth/profile-data`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );

  return data;
}
