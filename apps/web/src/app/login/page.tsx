'use client';

import { useRouter } from 'next/navigation';
import { LoginScreen } from '@celluloid/ui';

export default function LoginPage() {
  const router = useRouter();

  return (
    <LoginScreen
      onSubmit={(values) => {
        console.log('login submit', values);
      }}
      onForgotPassword={() => router.push('/forgot-password')}
      onGoToSignup={() => router.push('/signup')}
    />
  );
}
