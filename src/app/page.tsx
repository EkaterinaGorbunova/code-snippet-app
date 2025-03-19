import Link from 'next/link';
import { redirect } from 'next/navigation';

import { db } from '@/database';
import { getUser } from '@/actions/authServices';

import { Button } from '@/components/ui/button';

type PageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function Home({ searchParams }: PageProps) {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  const blocks = await db.block.findMany({
    where: {
      userId: user.id,
    },
  });

  const { error } = await searchParams;
  const errorMessage = error ? decodeURIComponent(error) : '';

  return (
    <>
      {errorMessage && (
        <div className="mb-4">
          <p className="text-center text-red-500">{errorMessage}</p>
        </div>
      )}

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
              You haven&apos;t created any code blocks yet.
            </p>
          ) : (
            blocks.map((block) => (
              <Link
                key={block.id}
                href={`/blocks/${block.id}`}
                className='flex justify-between items-center p-2 border rounded hover:bg-gray-50'
              >
                <div className="flex-1 mr-4">{block.title}</div>
                <div className="text-gray-500">View</div>
              </Link>
            ))
          )}
      </div>
    </>
  );
}
