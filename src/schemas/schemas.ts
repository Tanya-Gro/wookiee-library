import z from 'zod';

export const MAX_SIZE = 2 * 1024 * 1024;

export const formDataSchema = z.object({
  name: z
    .string({ message: 'Name is required' })
    .min(1, 'Name is required')
    .regex(/^[A-Z]/, 'First letter must be uppercase'),
  age: z.number('Age is required').min(1, 'Age must be greater than 0'),
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  gender: z.enum(['male', 'female']),
  country: z.string().nonempty('Please select a country'),
  picture: z
    .instanceof(File, { message: 'File is required' })
    .refine((file) => file.size <= MAX_SIZE, 'Max file size is 2MB')
    .refine(
      (file) => ['image/png', 'image/jpeg'].includes(file.type),
      'Allow PNG or JPEG only'
    ),
});

export type FormValues = z.infer<typeof formDataSchema>;
