"use server";

import { db } from "@/db";

export async function findBlock(id: number) {
  try {
    const block = await db.blocks.findUnique({
      where: { id },
    });
    return block;
  } catch (error) {
    console.error("Error finding block:", error);
    throw new Error("Failed to find block.");
  }
}

export async function addBlock({ title, code }: { title: string; code: string }) {
    try {
      const newBlock = await db.blocks.create({
        data: { title, code},
      });
      return newBlock;
    } catch (error) {
      console.error("Error creating a new block:", error);
      throw new Error("Failed to create a new block.");
    }
  }

  export async function editBlock(id: number, title: string, code: string) {
    try {
      const editedBlock = await db.blocks.update({
        where: { id },
        data: { title, code },
      });
  
      return editedBlock;
    } catch (error) {
      console.error("Error editing block:", error);
      throw new Error("Failed to edit block.");
    }
  }

export async function deleteBlock(id: number) {
  try {
    await db.blocks.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting block:", error);
    throw new Error("Failed to delete block.");
  }
}