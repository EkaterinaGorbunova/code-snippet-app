import { db } from "@/db";
import { notFound, redirect } from "next/navigation";
import { findBlock, editBlock, deleteBlock } from "@/db/actions";

interface BlockShowPageProps {
  params: {
    id: string;
  };
}

export default async function BlockShowPage(props: BlockShowPageProps) {
  const { id } = await props.params; // https://nextjs.org/docs/messages/sync-dynamic-apis#possible-ways-to-fix-it
  const block = await findBlock(parseInt(id));

  if (!block) {
    return notFound();
  }

  async function handleDelete() {
    "use server";
    await deleteBlock(block.id);
    redirect("/");
  }

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{block.title}</h1>
        <div className="flex gap-4">
          <button className="p-2 border rounded">Edit</button>

          <form action={handleDelete}>
            <button type="submit" className="p-2 border rounded bg-red-500 text-white">
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{block.code}</code>
      </pre>
    </div>
  );
}
