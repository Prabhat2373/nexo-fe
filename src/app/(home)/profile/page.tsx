import { Button } from '@/components/ui/button';
import ProfileIndexContainer from '@/containers/profile/ProfileIndexContainer';
import { cookies } from 'next/headers';

import React from 'react';

export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/profile`, {
    next: { revalidate: 60, tags: ['collection'] },
    headers: {
      authorization: `Bearer ${cookies().get('token')?.value}`
    }
  });

  console.log('authtoken', cookies().get('token'));
  const profile = await res.json();
  console.log('profileress', profile);
  return <ProfileIndexContainer data={profile} />;
}
