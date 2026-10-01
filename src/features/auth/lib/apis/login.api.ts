import axios from 'axios';
import type { TLoginField } from '../types/login-field';

export async function login(userData: TLoginField) {
  try {
    const data = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, userData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
