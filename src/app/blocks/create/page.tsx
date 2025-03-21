'use client';


import { useState } from 'react';
import Link from 'next/link';

import { createBlock } from '@/actions/dbServices';
import { Button } from '@/components/ui/button';
import { CodeEditor } from '@/components/CodeEditor';

export default function BlockCreatePage() {
  const [code, setCode] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('code', code);
    await createBlock(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <h3 className='text-xl font-bold m-4'>Create Block</h3>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-4'>
          <label className='w-12' htmlFor='title'>Title</label>
          <input
            type="text"
            name='title'
            className='border rounded p-2 w-full'
            id='title'
            required
          />
        </div>

        <div className='flex gap-4'>
          <label className='w-12' htmlFor='code'>Code</label>
          <div className='w-full h-[400px] border rounded'>
            <CodeEditor
              existingCode={code}
              onChange={setCode}
            />
          </div>
        </div>

        <div className='flex gap-4'>
          <Button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'>
            Create
          </Button>

          <Link href='/'>
            <Button variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </form>
  );
}
