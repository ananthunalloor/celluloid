import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  config,
  TamaguiProvider,
  LoginScreen,
  SignupScreen,
  ForgotPasswordScreen,
  VerifyEmailScreen,
  ProfileScreen,
} from '@celluloid/ui';
import { getErrorMessage } from '@celluloid/api';

import { authHooks, useAuthStore } from './lib/auth';

type Screen = 'login' | 'signup' | 'forgot-password' | 'verify-pending' | 'profile';

const queryClient = new QueryClient();

function AuthFlow() {
  const [screen, setScreen] = useState<Screen>('login');
  const [pendingEmail, setPendingEmail] = useState('');
  const [resent, setResent] = useState(false);

  const hydrated = authHooks.useAuthHydrated();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  // Derived, not stored: once a session exists there's nothing else to
  // navigate to except the profile screen, regardless of what `screen` was
  // left on (e.g. after a fresh login or an app restart with a persisted
  // session).
  const effectiveScreen: Screen = accessToken ? 'profile' : screen;

  const login = authHooks.useLogin();
  const signup = authHooks.useSignup();
  const forgotPassword = authHooks.useRequestPasswordReset();
  const resendVerification = authHooks.useResendVerificationEmail();
  const { data: user } = authHooks.useMe({ enabled: hydrated && Boolean(accessToken) });
  const updateProfile = authHooks.useUpdateProfile();
  const logout = authHooks.useLogout();

  if (!hydrated) return null;

  if (effectiveScreen === 'profile') {
    if (!user) return null;
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
        onLogout={() => logout.mutate(undefined, { onSuccess: () => setScreen('login') })}
      />
    );
  }

  if (effectiveScreen === 'verify-pending') {
    return (
      <VerifyEmailScreen
        status="pending"
        isResending={resendVerification.isPending}
        resent={resent}
        onResend={() => {
          if (!pendingEmail) return;
          resendVerification.mutate(pendingEmail, { onSuccess: () => setResent(true) });
        }}
        onGoToLogin={() => setScreen('login')}
      />
    );
  }

  if (effectiveScreen === 'forgot-password') {
    return (
      <ForgotPasswordScreen
        isSubmitting={forgotPassword.isPending}
        submitted={forgotPassword.isSuccess}
        onSubmit={(values) => forgotPassword.mutate(values.email)}
        onGoToLogin={() => setScreen('login')}
      />
    );
  }

  if (effectiveScreen === 'signup') {
    return (
      <SignupScreen
        isSubmitting={signup.isPending}
        error={signup.error ? getErrorMessage(signup.error) : undefined}
        onSubmit={(values) => {
          setPendingEmail(values.email);
          signup.mutate(
            { email: values.email, password: values.password, name: values.name },
            { onSuccess: () => setScreen('verify-pending') },
          );
        }}
        onGoToLogin={() => setScreen('login')}
      />
    );
  }

  return (
    <LoginScreen
      isSubmitting={login.isPending}
      error={login.error ? getErrorMessage(login.error) : undefined}
      onSubmit={(values) => login.mutate({ email: values.email, password: values.password })}
      onForgotPassword={() => setScreen('forgot-password')}
      onGoToSignup={() => setScreen('signup')}
    />
  );
}

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config} defaultTheme="celluloid">
        <AuthFlow />
      </TamaguiProvider>
    </QueryClientProvider>
  );
};

export default App;
