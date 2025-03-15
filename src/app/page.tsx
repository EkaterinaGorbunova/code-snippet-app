import Link from 'next/link';
import { db } from '@/database';
import { getUser } from '@/actions/authServices';
import { redirect } from 'next/navigation';
import { User } from 'lucide-react';

export default async function Home() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const blocks = await db.block.findMany({
    where: {
      userId: user.id,
    },
  });

  const codeBlocks = blocks.map((block) => {
    return (
      <Link
        key={block.id}
        href={`/blocks/${block.id}`}
        className='flex justify-between items-center p-2 border rounded'
      >
        <div>{block.title}</div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <div>
      <header className='py-4 rounded-lg'>
        <div className='container mx-auto flex items-center gap-3'>
          <User className='h-6 w-6' />
          { user && <h1 className='text-2xl font-bold text-primary'>Welcome, {user.username}</h1> }
        </div>
      </header>
      <div className='flex mt-2 mb-2 justify-between items-center'>
        <div>
          <h1 className='text-xl font-bold'>Blocks</h1>
        </div>
        <Link
          href='/blocks/create'
          className='border p-2 rounded bg-blue-500 hover:bg-blue-600 text-white'
        >
          Create
        </Link>
      </div>
      <div className='flex flex-col gap-2'>{codeBlocks}</div>
    </div>
  );
}
