import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, 'Enter name please'),
  email: z.string().min(1, 'Enter email please'),
  country: z.string().min(1, 'Enter country please'),
});
