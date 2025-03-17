import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { findBlock, deleteBlock } from '@/actions/dbServices';
import DeleteForm from './DeleteForm';
import { Button } from '@/components/ui/button';

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
      <div className='flex flex-col sm:flex-row mt-4 mb-4 justify-between items-start sm:items-center gap-4 sm:gap-0'>
        <h1 className='text-xl font-bold'>{block.title}</h1>
        <div className='flex gap-4 w-full sm:w-auto'>
          <Link href='/'>
            <Button variant="outline">
              Home
            </Button>
          </Link>

          <Link href={`/blocks/${block.id}/edit`}>
            <Button variant="outline">
              Edit
            </Button>
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
