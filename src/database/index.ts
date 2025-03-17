import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

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

