import type React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/actions/authServices';
import { getBaseUrl } from '@/actions/helperFunctions';
import { getUser } from '@/actions/authServices';
import { redirect } from 'next/navigation';

export default async function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const user = await getUser();
  
  if (user) {
    redirect('/');
  }

  const { error, success } = searchParams;
  const errorMessage = error ? decodeURIComponent(error) : '';
  const successMessage = success ? decodeURIComponent(success) : '';
  const baseUrl = await getBaseUrl();

  return (
    <div className="flex justify-center items-center min-h-[400px] p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-muted-foreground">Enter your credentials to access your account</p>
        </div>

        <form action={login} className="space-y-4">
          {successMessage && <p className="text-center text-green-500">{successMessage}</p>}
          {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Login
          </Button>

          <div className="flex items-center justify-center space-x-1 w-full mt-4 text-sm text-muted-foreground">
            <span>Don't have an account?</span>
            <Button variant="link" className="h-auto p-0" size="sm" asChild>
              <a href={`${baseUrl}/register`}>Register</a>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
