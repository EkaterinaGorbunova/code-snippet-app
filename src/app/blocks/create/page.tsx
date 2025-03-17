import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createBlock } from '@/actions/dbServices';
import { Button } from '@/components/ui/button';

export default function BlockCreatePage() {

  return (
    <form action={createBlock} className='flex flex-col gap-4'>
      <h3 className='text-xl font-bold m-4'>Create a Block</h3>
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
          <textarea
            name='code'
            className='border rounded p-2 w-full'
            id='code'
            rows={6}
            required
          />
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
