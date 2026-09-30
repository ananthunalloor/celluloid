'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProfileScreen } from '@celluloid/ui';

import { authHooks, useAuthStore } from '../../lib/auth';

export default function ProfilePage() {
  const router = useRouter();
  const hydrated = authHooks.useAuthHydrated();
  const accessToken = useAuthStore((state) => state.accessToken);
  const { data: user, isLoading } = authHooks.useMe({ enabled: hydrated });
  const updateProfile = authHooks.useUpdateProfile();
  const resendVerification = authHooks.useResendVerificationEmail();
  const logout = authHooks.useLogout();
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (hydrated && !accessToken) router.replace('/login');
  }, [hydrated, accessToken, router]);

  if (!hydrated || !accessToken || isLoading || !user) {
    return null;
  }

  return (
    <ProfileScreen
      user={user}
      isSaving={updateProfile.isPending}
      onSave={(values) => updateProfile.mutate(values)}
      isResendingVerification={resendVerification.isPending}
      resent={resent}
      onResendVerification={() => {
        setResent(false);
        resendVerification.mutate(user.email, { onSuccess: () => setResent(true) });
      }}
      onLogout={() => {
        logout.mutate(undefined, { onSuccess: () => router.push('/login') });
      }}
    />
  );
}
