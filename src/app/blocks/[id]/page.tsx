import Link from "next/link";
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
    await deleteBlock(parseInt(id));
    redirect("/");
  }

  return (
    <>
      <div className="flex mt-4 mb-4 justify-between items-center">
        <h1 className="text-xl font-bold">{block.title}</h1>
        <div className="flex gap-4">
          <Link href={`/blocks/${block.id}/edit`}>
            <button className="p-2 border rounded hover:bg-gray-200 cursor-pointer">Edit</button>
          </Link>

          <form action={handleDelete}>
            <button type="submit" className="p-2 border rounded bg-red-500 hover:bg-red-600 text-white cursor-pointer">
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{block.code}</code>
      </pre>
    </>
  );
}
