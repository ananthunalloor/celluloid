'use client';

import { useRouter } from 'next/navigation';
import { LoginScreen } from '@celluloid/ui';
import { getErrorMessage } from '@celluloid/api';

import { authHooks } from '../../lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const { mutate: login, isPending, error } = authHooks.useLogin();

  return (
    <LoginScreen
      isSubmitting={isPending}
      error={error ? getErrorMessage(error) : undefined}
      onSubmit={(values) => {
        login(
          { email: values.email, password: values.password },
          { onSuccess: () => router.push('/profile') },
        );
      }}
      onForgotPassword={() => router.push('/forgot-password')}
      onGoToSignup={() => router.push('/signup')}
    />
  );
}
