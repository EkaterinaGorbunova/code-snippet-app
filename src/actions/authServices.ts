'use server';

import { cookies } from 'next/headers';
import { db } from '@/database';
import { redirect } from 'next/navigation';
import { setSessionCookie } from './helperFunctions';


export async function register(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const existingUser = await db.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    redirect('/register?error=User%20already%20exists');
  }

  await db.user.create({
    data: { username, password },
  });

  redirect('/login?success=Account%20created%20successfully!');
}

export async function login(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const foundUser = await db.user.findUnique({
    where: { username, password },
  });

  if (!foundUser) {
    redirect('/login?error=User%20not%20found');
  }

  // Create session with user data
  const sessionData = {
    id: foundUser.id,
    username: foundUser.username
  };
  
  // Convert to string for cookie storage
  const sessionToken = JSON.stringify(sessionData);
  await setSessionCookie(sessionToken);

  redirect('/');
}

export async function getUser() {
  const sessionToken = (await cookies()).get('session_token')?.value;
  
  if (!sessionToken) {
    return null;
  }

  try {
    return JSON.parse(sessionToken);
  } catch {
    return null;
  }
}