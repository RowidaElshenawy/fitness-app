import axios from 'axios';
import type { TLoginField } from '../../types/login-field';

export async function login(userData: TLoginField) {
  const data = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, userData);
  return data;
}
