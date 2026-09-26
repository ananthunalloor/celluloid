'use client';

import { useRouter } from 'next/navigation';
import { SignupScreen } from '@celluloid/ui';

export default function SignupPage() {
  const router = useRouter();

  return (
    <SignupScreen
      onSubmit={(values) => {
        console.log('signup submit', values);
      }}
      onGoToLogin={() => router.push('/login')}
    />
  );
}
