import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApiClient, createAuthHooks, createAuthStore } from '@celluloid/api';

export const useAuthStore = createAuthStore(AsyncStorage);

export const apiClient = createApiClient({
  baseUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8000',
  getAccessToken: () => useAuthStore.getState().accessToken,
  getRefreshToken: () => useAuthStore.getState().refreshToken,
  setAccessToken: (accessToken) => useAuthStore.getState().setAccessToken(accessToken),
  clearSession: () => useAuthStore.getState().clear(),
});

export const authHooks = createAuthHooks(apiClient, useAuthStore);
