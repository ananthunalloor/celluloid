import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';

import type { AuthTokens, AuthUser } from './types';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  setSession: (tokens: AuthTokens, user?: AuthUser | null) => void;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: AuthUser | null) => void;
  clear: () => void;
}

/**
 * Each app (web, mobile) provides its own storage engine (localStorage,
 * AsyncStorage, ...) since that's the only platform-specific bit.
 *
 * Hydration is skipped at creation time and must be triggered explicitly
 * (`store.persist.rehydrate()`) after mount, so this is safe to import from
 * a server-rendered component (e.g. Next.js) without touching `window`.
 */
export function createAuthStore(storage: StateStorage, name = 'celluloid-auth') {
  return create<AuthState>()(
    persist(
      (set) => ({
        accessToken: null,
        refreshToken: null,
        user: null,
        setSession: (tokens, user) =>
          set({
            accessToken: tokens.access,
            refreshToken: tokens.refresh,
            ...(user !== undefined ? { user } : {}),
          }),
        setAccessToken: (accessToken) => set({ accessToken }),
        setUser: (user) => set({ user }),
        clear: () => set({ accessToken: null, refreshToken: null, user: null }),
      }),
      {
        name,
        storage: createJSONStorage(() => storage),
        skipHydration: true,
        partialize: (state) => ({
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          user: state.user,
        }),
      },
    ),
  );
}

export type AuthStore = ReturnType<typeof createAuthStore>;
