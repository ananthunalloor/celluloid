'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ForgotPasswordScreen } from '@celluloid/ui';

import { authHooks } from '../../lib/auth';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const { mutate: requestReset, isPending } = authHooks.useRequestPasswordReset();

  return (
    <ForgotPasswordScreen
      isSubmitting={isPending}
      submitted={submitted}
      onSubmit={(values) => {
        requestReset(values.email, { onSuccess: () => setSubmitted(true) });
      }}
      onGoToLogin={() => router.push('/login')}
    />
  );
}
