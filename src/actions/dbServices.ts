'use server';

import { redirect } from 'next/navigation';
import { db } from '@/database';

export const createBlock = async (formData: FormData) => {
  // formData icludes title and code from the form input
  try {
    const title = formData.get('title') as string;
    const code = formData.get('code') as string;

    const newBlock = await db.block.create({
      data: { title, code, user: { connect: { id: 1 } } }, // TODO: dynamiclly
    });

    redirect(`/blocks/${newBlock.id}`);
  } catch (error) {
    console.error('Error creating a new block:', error);
    redirect('/blocks/create?error=Failed%20to%20create%20block');
  }
};

