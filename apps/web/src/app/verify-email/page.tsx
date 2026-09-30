'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { VerifyEmailScreen, type VerifyEmailStatus } from '@celluloid/ui';
import { getErrorMessage } from '@celluloid/api';

import { authHooks } from '../../lib/auth';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const isPending = searchParams.get('pending') === '1';

  const [resent, setResent] = useState(false);
  const verifyEmail = authHooks.useVerifyEmail();
  const resendVerification = authHooks.useResendVerificationEmail();

  useEffect(() => {
    if (token) verifyEmail.mutate(token);
    // Only ever run once per token — verifyEmail's identity changes every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  let status: VerifyEmailStatus = 'pending';
  if (token) {
    if (verifyEmail.isPending) status = 'verifying';
    else if (verifyEmail.isSuccess) status = 'success';
    else if (verifyEmail.isError) status = 'error';
  } else if (!isPending) {
    status = 'error';
  }

  return (
    <VerifyEmailScreen
      status={status}
      errorMessage={verifyEmail.error ? getErrorMessage(verifyEmail.error) : undefined}
      isResending={resendVerification.isPending}
      resent={resent}
      onResend={() => {
        if (!email) return;
        resendVerification.mutate(email, { onSuccess: () => setResent(true) });
      }}
      onGoToLogin={() => router.push('/login')}
    />
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}
