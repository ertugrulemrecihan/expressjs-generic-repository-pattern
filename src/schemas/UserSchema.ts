import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Please enter a valid email address',
    }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, {
      message: 'Password must be at least 6 characters long',
    }),
});

const registerSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(3, {
      message: 'Name must be at least 3 characters long',
    }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Please enter a valid email address',
    }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, {
      message: 'Password must be at least 6 characters long',
    }),
});

export { loginSchema, registerSchema };
