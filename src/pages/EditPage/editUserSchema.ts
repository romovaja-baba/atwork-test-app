import { z } from 'zod';

export const editUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать от 2 до 64 символов')
    .max(64, 'Имя должно содержать от 2 до 64 символов'),

  username: z
    .string()
    .min(2, 'Никнейм должен содержать от 2 до 64 символов')
    .max(64, 'Никнейм должен содержать от 2 до 64 символов'),

  email: z
    .string()
    .email('Введите корректный email'),

  city: z
    .string()
    .min(2, 'Город должен содержать от 2 до 64 символов')
    .max(64, 'Город должен содержать от 2 до 64 символов'),

  phone: z
    .string()
    .min(1, 'Введите номер телефона')
    .regex(/^\d+$/, 'Телефон должен содержать только цифры'),

  companyName: z
    .string()
    .min(2, 'Название компании должно содержать от 2 до 64 символов')
    .max(64, 'Название компании должно содержать от 2 до 64 символов'),
});

export type EditUserSchema = z.infer<typeof editUserSchema>;
