import { z } from 'zod';
export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .nonempty('Password is required')
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z]).{9,}$/,
      'Password must be at least 9 characters and contain at least one uppercase and one lowercase letter'
    ),
});
