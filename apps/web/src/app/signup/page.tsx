'use client';

import { useRouter } from 'next/navigation';
import { SignupScreen } from '@celluloid/ui';
import { getErrorMessage } from '@celluloid/api';

import { authHooks } from '../../lib/auth';

export default function SignupPage() {
  const router = useRouter();
  const { mutate: signup, isPending, error } = authHooks.useSignup();

  return (
    <SignupScreen
      isSubmitting={isPending}
      error={error ? getErrorMessage(error) : undefined}
      onSubmit={(values) => {
        signup(
          { email: values.email, password: values.password, name: values.name },
          {
            onSuccess: () =>
              router.push(`/verify-email?pending=1&email=${encodeURIComponent(values.email)}`),
          },
        );
      }}
      onGoToLogin={() => router.push('/login')}
    />
  );
}
