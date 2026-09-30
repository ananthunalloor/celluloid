import type {
  AuthTokens,
  AuthUser,
  ConfirmPasswordResetInput,
  DetailResponse,
  LoginInput,
  SignupInput,
} from './types';

export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown) {
    super(extractErrorMessage(body) ?? `Request failed with status ${status}`);
    this.status = status;
    this.body = body;
  }
}

/**
 * DRF error bodies vary by source: {"detail": "..."} for auth/permission
 * errors and throttling, {"field": ["msg", ...]} or {"non_field_errors":
 * [...]} for serializer validation. This picks the first human-readable
 * string it can find so callers can show *something* useful without each
 * one re-implementing DRF error shape parsing.
 */
function extractErrorMessage(body: unknown): string | null {
  if (!body || typeof body !== 'object') return null;
  const data = body as Record<string, unknown>;

  if (typeof data.detail === 'string') return data.detail;

  for (const value of Object.values(data)) {
    if (typeof value === 'string') return value;
    if (Array.isArray(value) && typeof value[0] === 'string') return value[0];
  }

  return null;
}

export interface ApiClientConfig {
  baseUrl: string;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  setAccessToken: (accessToken: string) => void;
  clearSession: () => void;
}

interface RequestOptions extends RequestInit {
  auth?: boolean;
}

export function createApiClient(config: ApiClientConfig) {
  async function refreshAccessToken(): Promise<string | null> {
    const refresh = config.getRefreshToken();
    if (!refresh) return null;

    const response = await fetch(`${config.baseUrl}/api/auth/login/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });
    if (!response.ok) return null;

    const data = (await response.json()) as { access: string };
    config.setAccessToken(data.access);
    return data.access;
  }

  async function request<T>(
    path: string,
    { auth = true, ...init }: RequestOptions = {},
    canRetry = true,
  ): Promise<T> {
    const headers = new Headers(init.headers);
    headers.set('Content-Type', 'application/json');
    if (auth) {
      const token = config.getAccessToken();
      if (token) headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${config.baseUrl}${path}`, { ...init, headers });

    if (response.status === 401 && auth && canRetry) {
      const newToken = await refreshAccessToken();
      if (newToken) return request<T>(path, { auth, ...init }, false);
      config.clearSession();
    }

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new ApiError(response.status, body);
    }

    if (response.status === 204) return undefined as T;
    return (await response.json()) as T;
  }

  return {
    register: (input: SignupInput) =>
      request<{ user: AuthUser }>('/api/auth/register/', {
        method: 'POST',
        body: JSON.stringify(input),
        auth: false,
      }),

    login: (input: LoginInput) =>
      request<AuthTokens & { user: AuthUser }>('/api/auth/login/', {
        method: 'POST',
        body: JSON.stringify(input),
        auth: false,
      }),

    logout: (refresh: string) =>
      request<void>('/api/auth/logout/', { method: 'POST', body: JSON.stringify({ refresh }) }),

    me: () => request<AuthUser>('/api/auth/me/'),

    updateProfile: (input: Partial<Pick<AuthUser, 'name'>>) =>
      request<AuthUser>('/api/auth/me/', { method: 'PATCH', body: JSON.stringify(input) }),

    verifyEmail: (token: string) =>
      request<AuthUser>('/api/auth/verify-email/', {
        method: 'POST',
        body: JSON.stringify({ token }),
        auth: false,
      }),

    resendVerificationEmail: (email: string) =>
      request<DetailResponse>('/api/auth/verify-email/resend/', {
        method: 'POST',
        body: JSON.stringify({ email }),
        auth: false,
      }),

    requestPasswordReset: (email: string) =>
      request<DetailResponse>('/api/auth/password-reset/', {
        method: 'POST',
        body: JSON.stringify({ email }),
        auth: false,
      }),

    confirmPasswordReset: (input: ConfirmPasswordResetInput) =>
      request<DetailResponse>('/api/auth/password-reset/confirm/', {
        method: 'POST',
        body: JSON.stringify(input),
        auth: false,
      }),
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;

export function getErrorMessage(
  error: unknown,
  fallback = 'Something went wrong. Please try again.',
): string {
  return error instanceof ApiError ? error.message : fallback;
}
