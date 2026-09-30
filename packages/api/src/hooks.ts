import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { ApiClient } from './client';
import type { AuthStore } from './auth-store';
import type { ConfirmPasswordResetInput, LoginInput, SignupInput } from './types';

const ME_QUERY_KEY = ['auth', 'me'] as const;

export function createAuthHooks(client: ApiClient, useAuthStore: AuthStore) {
  // Persisted state is rehydrated asynchronously (see AuthStore's
  // `skipHydration`); pages/screens can wait for this before deciding
  // whether to redirect an unauthenticated user away from a protected view.
  function useAuthHydrated() {
    const [hydrated, setHydrated] = useState(() => useAuthStore.persist.hasHydrated());

    useEffect(() => {
      if (hydrated) return;
      return useAuthStore.persist.onFinishHydration(() => setHydrated(true));
    }, [hydrated]);

    return hydrated;
  }

  function useLogin() {
    const setSession = useAuthStore((state) => state.setSession);
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (input: LoginInput) => client.login(input),
      onSuccess: (data) => {
        setSession({ access: data.access, refresh: data.refresh }, data.user);
        queryClient.setQueryData(ME_QUERY_KEY, data.user);
      },
    });
  }

  function useSignup() {
    return useMutation({
      mutationFn: (input: SignupInput) => client.register(input),
    });
  }

  function useLogout() {
    const clear = useAuthStore((state) => state.clear);
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async () => {
        const refresh = useAuthStore.getState().refreshToken;
        if (refresh) await client.logout(refresh);
      },
      onSettled: () => {
        clear();
        queryClient.removeQueries({ queryKey: ME_QUERY_KEY });
      },
    });
  }

  function useMe(options: { enabled?: boolean } = {}) {
    const accessToken = useAuthStore((state) => state.accessToken);
    const setUser = useAuthStore((state) => state.setUser);
    const query = useQuery({
      queryKey: ME_QUERY_KEY,
      queryFn: () => client.me(),
      enabled: (options.enabled ?? true) && Boolean(accessToken),
    });

    useEffect(() => {
      if (query.data) setUser(query.data);
    }, [query.data, setUser]);

    return query;
  }

  function useUpdateProfile() {
    const setUser = useAuthStore((state) => state.setUser);
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (input: Parameters<ApiClient['updateProfile']>[0]) => client.updateProfile(input),
      onSuccess: (user) => {
        setUser(user);
        queryClient.setQueryData(ME_QUERY_KEY, user);
      },
    });
  }

  function useVerifyEmail() {
    const setUser = useAuthStore((state) => state.setUser);
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (token: string) => client.verifyEmail(token),
      onSuccess: (user) => {
        setUser(user);
        queryClient.setQueryData(ME_QUERY_KEY, user);
      },
    });
  }

  function useResendVerificationEmail() {
    return useMutation({
      mutationFn: (email: string) => client.resendVerificationEmail(email),
    });
  }

  function useRequestPasswordReset() {
    return useMutation({
      mutationFn: (email: string) => client.requestPasswordReset(email),
    });
  }

  function useConfirmPasswordReset() {
    return useMutation({
      mutationFn: (input: ConfirmPasswordResetInput) => client.confirmPasswordReset(input),
    });
  }

  return {
    useAuthHydrated,
    useLogin,
    useSignup,
    useLogout,
    useMe,
    useUpdateProfile,
    useVerifyEmail,
    useResendVerificationEmail,
    useRequestPasswordReset,
    useConfirmPasswordReset,
  };
}

export type AuthHooks = ReturnType<typeof createAuthHooks>;
