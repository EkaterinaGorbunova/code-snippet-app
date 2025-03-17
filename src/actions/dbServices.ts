'use server';

import { redirect } from 'next/navigation';
import { db } from '@/database';
import { getUser } from './authServices';

export const createBlock = async (formData: FormData) => {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }

  const title = formData.get('title') as string;
  const code = formData.get('code') as string;

  let newBlock;

  try {
    newBlock = await db.block.create({
      data: { title, code, user: { connect: { id: user.id } } },
    });
  } catch (error) {
    console.error('Error creating block:', error);
    redirect('/?error=' + encodeURIComponent('Failed to create block'));
  }

  redirect(`/blocks/${newBlock.id}`);
};

export async function findBlock(id: number) {
  try {
    const block = await db.block.findUnique({
      where: { id },
    });
    return block;
  } catch (error) {
    console.error('Error finding block:', error);
  }
}

export async function editBlock(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const code = formData.get('code') as string;

  try {
    await db.block.update({
      where: { id },
      data: { title, code },
    });
  } catch (error) {
    console.error('Error updating block:', error);
  }

  redirect(`/blocks/${id}`);
}

export async function deleteBlock(id: number) {
  try {
    await db.block.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting block:', error);
  }
}
