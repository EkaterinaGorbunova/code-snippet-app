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
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0'>
          <Link href='/'>
            <Button variant="ghost" className='w-full sm:w-auto'>
              <Home className='h-5 w-5 mr-2' />
              Home
            </Button>
          </Link>
          
          <div className='flex items-center gap-3 w-full sm:w-auto'>
            <div className='flex items-center gap-2'>
              <User className='h-5 w-5 text-gray-600' />
              <span className='text-sm font-medium text-gray-800'>
                Welcome, {user.username}
              </span>
            </div>
            <form action={logout}>
              <Button 
                variant="outline"
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