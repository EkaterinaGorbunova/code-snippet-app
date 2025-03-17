'use server';

import { cookies, headers } from 'next/headers';

export async function getBaseUrl() {
  const headersList = await headers();
  const host = headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  return `${protocol}://${host}`;
}

export const setSessionCookie = async (sessionToken: string) => {
  (await cookies()).set({
    name: 'session_token',
    value: sessionToken,
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  });
};