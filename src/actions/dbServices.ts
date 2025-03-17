'use server';

import { redirect } from 'next/navigation';
import { db } from '@/database';
import { getUser } from './authServices';

export const createBlock = async (formData: FormData) => {
  const user = await getUser();
  
  // formData is the data from the input fields in the form
  const title = formData.get('title') as string;
  const code = formData.get('code') as string;

  const newBlock = await db.block.create({
    data: { title, code, user: { connect: { id: user.id } } }
  });

  redirect(`/blocks/${newBlock.id}`);
};

