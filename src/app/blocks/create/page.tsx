'use client';

import { useState } from 'react';
import { redirect } from 'next/navigation';
import { addBlock } from '@/db/actions';
import { db } from '@/db';

export default function BlockCreatePage() {
  const [title, setTitle] = useState<string>('');
  const [code, setCode] = useState<string>('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await addBlock({ title, code });
    redirect('/');
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <h3 className='text-xl font-bold m-4'>Create a Block</h3>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <label className='w-12' htmlFor='title'>Title</label>
          <input
            name='title'
            className='border rounded p-2 w-full'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className='flex gap-4'>
          <label className='w-12' htmlFor='code'>Code</label>
          <textarea
            name='code'
            className='border rounded p-2 w-full'
            id='code'
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
