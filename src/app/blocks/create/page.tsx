import Link from 'next/link';
import { redirect } from 'next/navigation';
import { addBlock } from '@/db';

export default function BlockCreatePage() {
  async function createBlock(formData: FormData) {
    'use server';

    const title = formData.get('title') as string;
    const code = formData.get('code') as string;

    const newBlock = await addBlock({ title, code });
    redirect(`/blocks/${newBlock.id}`);
  }

  return (
    <form action={createBlock} className='flex flex-col gap-4'>
      <h3 className='text-xl font-bold m-4'>Create a Block</h3>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <label className='w-12' htmlFor='title'>Title</label>
          <input
            name='title'
            className='border rounded p-2 w-full'
            id='title'
            required
          />
        </div>

        <div className='flex gap-4'>
          <label className='w-12' htmlFor='code'>Code</label>
          <textarea
            name='code'
            className='border rounded p-2 w-full'
            id='code'
            rows={6}
            required
          />
        </div>

        <div className='flex gap-4'>
          <button
            type='submit'
            className='px-6 py-1.5 w-fit rounded p-2 bg-blue-500 text-white hover:bg-blue-600 cursor cursor-pointer'
          >
            Create
          </button>

          <Link
            href='/'
            className='px-6 py-2 w-fit rounded p-2 bg-blue-500 text-white hover:bg-blue-600 cursor cursor-pointer'
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
