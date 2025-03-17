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

export async function editBlock(id: number, title: string, code: string) {
  try {
    const editedBlock = await db.block.update({
      where: { id },
      data: { title, code },
    });

    return editedBlock;
  } catch (error) {
    console.error('Error editing block:', error);
  }
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


