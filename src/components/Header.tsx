import Link from 'next/link';
import { User, LogOut, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout, getUser } from '@/actions/authServices';

export default async function Header() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return (
    <header className='py-4 mb-8 border-b'>
      <nav className='container mx-auto px-4'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between sm:gap-0'>
          <div className='pl-0'>
            <Link
              href='/'
              className='inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors -ml-3 p-3'
            >
              <Home className='h-4 w-4 text-gray-600' />
              <span className='text-sm font-medium text-gray-800'>Home</span>
            </Link>
          </div>

          <div className='flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto'>
            <div className='flex items-center gap-1'>
              <User className='h-4 w-4 text-gray-600' />
              <span className='text-sm font-medium text-gray-800'>
                Welcome, {user.username}
              </span>
            </div>
            <form action={logout}>
              <Button
                variant='outline'
                className='w-full sm:w-auto text-gray-600 hover:text-gray-800'
              >
                <LogOut className='h-5 w-5 mr-2' />
                Logout
              </Button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
