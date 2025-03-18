'use server';

import { cookies } from 'next/headers';
import { db } from '@/database';
import { redirect } from 'next/navigation';
import { setSessionCookie } from './helperFunctions';

export async function getUser() {
  const sessionId = (await cookies()).get('session_id')?.value;
  
  if (!sessionId) {
    return null;
  }

  try {
    return JSON.parse(sessionId);
  } catch {
    return null;
  }
}

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
  
  const foundUser = await db.user.findUnique({
    where: {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    },
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
  const sessionId = JSON.stringify(sessionData);
  await setSessionCookie(sessionId);

  redirect('/');
}

export async function logout() {
  'use server';
  
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id');
  
  if (!sessionId) {
    redirect('/?error=Logout%20failed.%20Session%20already%20expired');
  }
  
  cookieStore.delete('session_id');
  redirect('/login?success=You%20have%20been%20successfully%20logged%20out');
}
