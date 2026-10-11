import axios from 'axios';

import type { TChangePasswordPayload, TChangePasswordResponse } from '../types/change-password';

export async function changePassword(
  payload: TChangePasswordPayload,
  token: string
): Promise<TChangePasswordResponse> {
  const { data } = await axios.patch<TChangePasswordResponse>(
    `${import.meta.env.VITE_API_URL}/auth/change-password`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}
