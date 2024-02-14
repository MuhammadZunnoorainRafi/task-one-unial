'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { formSchema } from './schema';

type stateT = {
  errors?: {
    name?: string[];
    email?: string[];
    country?: string[];
  };
  message?: string[];
  success?: boolean;
};

export const createDataAction = async (
  prevState: stateT,
  formData: FormData
): Promise<stateT> => {
  const validation = formSchema.safeParse(Object.fromEntries(formData));
  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { name, email, country } = validation.data;

  try {
    await sql`INSERT INTO unial (name,email,country) 
                VALUES(${name},${email},${country})`;
  } catch (error) {
    if (error instanceof Error) {
      return { message: [error.message] };
    } else {
      return { message: ['Something went wrong!'] };
    }
  }

  revalidatePath('/');
  return {
    errors: {},
    success: true,
  };
};

export async function getData() {
  try {
    const data = await sql`SELECT * FROM unial`;

    return data.rows;
  } catch (error) {
    console.log(error);
  }
}
