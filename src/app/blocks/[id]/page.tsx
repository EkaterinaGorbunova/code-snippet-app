import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { findBlock, deleteBlock } from '@/db';
import DeleteForm from './DeleteForm';

interface BlockShowPageProps {
  params: {
    id: string;
  };
}

export default async function BlockShowPage({ params }:  BlockShowPageProps) {
  const { id } = await params; // https://nextjs.org/docs/messages/sync-dynamic-apis#possible-ways-to-fix-it
  const block = await findBlock(parseInt(id));

  if (!block) {
    return notFound();
  }

  async function handleDelete() {
    'use server';
    await deleteBlock(parseInt(id));
    redirect('/');
  }

  return (
    <>
      <div className='flex mt-4 mb-4 justify-between items-center'>
        <h1 className='text-xl font-bold'>{block.title}</h1>
        <div className='flex gap-4'>
          <Link href='/'>
            <button className='px-3 py-1.5 w-fit p-2 border rounded hover:bg-gray-200 cursor-pointer'>
              Home
            </button>
          </Link>

          <Link href={`/blocks/${block.id}/edit`}>
            <button className='px-3 py-1.5 w-fit p-2 border rounded hover:bg-gray-200 cursor-pointer'>
              Edit
            </button>
          </Link>

          <DeleteForm onDelete={handleDelete} />
        </div>
      </div>
      <pre className='p-3 border rounded bg-gray-200 border-gray-200 whitespace-pre-wrap break-words'>
        <code>{block.code}</code>
      </pre>
    </>
  );
}
