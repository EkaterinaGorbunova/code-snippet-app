import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { findBlock, editBlock } from '@/db';

interface EditBlockPageProps {
  params: {
    id: string;
  };
}

export default async function EditBlockPage(props: EditBlockPageProps) {
  const { id } = await props.params; // https://nextjs.org/docs/messages/sync-dynamic-apis#possible-ways-to-fix-it
  const block = await findBlock(parseInt(id));

  if (!block) {
    return notFound();
  }

  async function handleEdit(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    const code = formData.get('code') as string;
    await editBlock(parseInt(id), title, code);
    redirect(`/blocks/${id}`);
  }

  return (
    <form action={handleEdit} className='flex flex-col gap-4'>
      <h3 className='text-xl font-bold mb-4'>Edit Block</h3>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <label className='w-12'>Title</label>
          <input
            name='title'
            className='p-2 border rounded w-full'
            id='title'
            defaultValue={block.title}
            required
          />
        </div>
        <div className='flex gap-4'>
          <label className='w-12'>Code</label>
          <textarea
            name='code'
            className='p-2 border rounded w-full'
            id='code'
            defaultValue={block.code}
            rows={6}
            required
          />
        </div>

        <div className='flex gap-4'>
          <button
            type='submit'
            className='px-6 py-1.5 w-fit p-2 border rounded bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
          >
            Save
          </button>

          <Link href={`/blocks/${id}`}>
            <button className='px-3 py-1.5 w-fit border rounded hover:bg-gray-200 text-black cursor-pointer'>
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
}
