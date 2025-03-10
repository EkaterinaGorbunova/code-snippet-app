import { redirect } from 'next/navigation';
import { addBlock } from '@/db';

export default function BlockCreatePage() {
  async function handleSubmit(formData: FormData) {
    'use server';

    const title = formData.get('title')?.toString() || '';
    const code = formData.get('code')?.toString() || '';

    const newBlock = await addBlock({ title, code });
    redirect(`/blocks/${newBlock.id}`);
  }

  return (
    <form action={handleSubmit} className='flex flex-col gap-4'>
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

        <button
          type='submit'
          className='px-6 py-1.5 w-fit rounded p-2 bg-blue-500 text-white hover:bg-blue-600 cursor cursor-pointer'
        >
          Create
        </button>
      </div>
    </form>
  );
}
