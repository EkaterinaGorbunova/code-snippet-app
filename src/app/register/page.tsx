import type React from "react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { getBaseUrl } from "@/actions/helperFunctions";
import { getUser } from "@/actions/authServices";
import { register } from "@/actions/authServices";

export default async function RegisterPage({ searchParams }: { searchParams: { error?: string } }) {
  const user = await getUser();
  
  if (user) {
    redirect('/');
  }

  const { error } = await searchParams;
  const errorMessage = error ? decodeURIComponent(error) : ''; 
  const baseUrl = await getBaseUrl();

  return (
    <div className="flex justify-center items-center min-h-[400px] p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground">Create your account to store and manage code snippets</p>
        </div>

        <form action={register} className="space-y-4">
          { errorMessage && <p className="text-center text-red-500">{errorMessage}</p> }
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

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer">
            Register
          </Button>

          <div className="flex items-center justify-center space-x-1 w-full mt-4 text-sm text-muted-foreground">
            <span>Already have an account?</span>
            <Button variant="link" className="h-auto p-0" size="sm" asChild>
              <a href={`${baseUrl}/login`}>Login</a>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
