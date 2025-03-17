import Link from 'next/link';
import { redirect } from 'next/navigation';

import { db } from '@/database';
import { getUser, logout } from '@/actions/authServices';

import { User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function Home({ searchParams }: { searchParams: { error?: string } }) {
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
        className='flex justify-between items-center p-2 border rounded hover:bg-gray-50'
      >
        <div className="flex-1 mr-4">{block.title}</div>
        <div className="text-gray-500">View</div>
      </Link>
    );
  });

  const { error } = await searchParams;
  const errorMessage = error ? decodeURIComponent(error) : '';

  return (
    <div className="container mx-auto px-4">
      <header className='py-6'>
        <nav className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0'>
          <div className='flex items-center gap-3'>
            <User className='h-6 w-6 text-gray-600' />
            <h1 className='text-2xl font-bold text-gray-800'>
              Welcome, {user.username}!
            </h1>
          </div>
          <form action={logout}>
            <Button 
              variant="outline"
              className='w-full sm:w-auto text-gray-600 hover:text-gray-800 hover:bg-gray-100 cursor-pointer'
            >
              <LogOut className='h-5 w-5' />
              Logout
            </Button>
          </form>
        </nav>
        {errorMessage && (
          <div className="mt-4">
            <p className="text-center text-red-500">{errorMessage}</p>
          </div>
        )}
      </header>

      <main className='mt-8'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6'>
          <h2 className='text-xl font-bold text-gray-800'>Code Blocks</h2>
          <Link href='/blocks/create' className='w-full sm:w-auto'>
            <Button className='w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'>
              Create New Block
            </Button>
          </Link>
        </div>
        <div className='flex flex-col gap-2'>
          {blocks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              You haven't created any code blocks yet.
            </p>
          ) : (
            codeBlocks
          )}
        </div>
      </main>
    </div>
  );
}
