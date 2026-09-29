import axios from 'axios';

import type { IEditProfilePayload, IEditProfileResponse } from '../types/edit-profile';

export async function editProfile(payload: IEditProfilePayload): Promise<IEditProfileResponse> {
  const { data } = await axios.put<IEditProfileResponse>(
    `${import.meta.env.VITE_API_URL}/auth/editProfile`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );

  return data;
}
