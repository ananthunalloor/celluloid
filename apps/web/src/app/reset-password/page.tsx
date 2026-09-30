'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ResetPasswordScreen } from '@celluloid/ui';
import { getErrorMessage } from '@celluloid/api';

import { authHooks } from '../../lib/auth';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');
  const [success, setSuccess] = useState(false);
  const { mutate: confirmReset, isPending, error } = authHooks.useConfirmPasswordReset();

  return (
    <ResetPasswordScreen
      isSubmitting={isPending}
      success={success}
      error={
        !uid || !token
          ? 'This password reset link is invalid.'
          : error
            ? getErrorMessage(error)
            : undefined
      }
      onSubmit={(values) => {
        if (!uid || !token) return;
        confirmReset(
          { uid, token, new_password: values.password },
          {
            onSuccess: () => {
              setSuccess(true);
              setTimeout(() => router.push('/login'), 2000);
            },
          },
        );
      }}
    />
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
