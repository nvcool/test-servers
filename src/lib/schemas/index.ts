import { z } from "zod";

// Определение схемы валидации для формы с помощью Zod
export const formSchema = z.object({
  title: z.string().min(5, { message: "Минимум 5 символов!" }),
  description: z.string().min(20, { message: "Минимум 20 символов!" }),
  date: z.string().min(1, { message: "Введите дату" }).date(),
  time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/, "Введите время"),
  photo: z.string().url({ message: "Введите корректное URL" }),
});

export type FormSchemaType = z.infer<typeof formSchema>;
