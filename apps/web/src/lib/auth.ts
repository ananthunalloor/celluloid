import { createApiClient, createAuthHooks, createAuthStore } from '@celluloid/api';
import type { StateStorage } from 'zustand/middleware';

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

// `localStorage` doesn't exist during Next.js's server render of this
// ('use client') module, so fall back to a no-op storage there. Real
// persistence kicks in once `useAuthStore.persist.rehydrate()` runs on
// the client (see providers.tsx).
const storage: StateStorage = typeof window === 'undefined' ? noopStorage : window.localStorage;

export const useAuthStore = createAuthStore(storage);

export const apiClient = createApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000',
  getAccessToken: () => useAuthStore.getState().accessToken,
  getRefreshToken: () => useAuthStore.getState().refreshToken,
  setAccessToken: (accessToken) => useAuthStore.getState().setAccessToken(accessToken),
  clearSession: () => useAuthStore.getState().clear(),
});

export const authHooks = createAuthHooks(apiClient, useAuthStore);
