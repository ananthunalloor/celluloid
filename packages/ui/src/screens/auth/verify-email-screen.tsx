import { YStack, Text, Button, Theme } from 'tamagui';
import { AuthLayout } from './auth-layout';

export type VerifyEmailStatus = 'pending' | 'verifying' | 'success' | 'error';

export interface VerifyEmailScreenProps {
  status: VerifyEmailStatus;
  errorMessage?: string;
  onResend?: () => void;
  isResending?: boolean;
  resent?: boolean;
  onGoToLogin?: () => void;
}

export function VerifyEmailScreen({
  status,
  errorMessage,
  onResend,
  isResending,
  resent,
  onGoToLogin,
}: VerifyEmailScreenProps) {
  return (
    <AuthLayout title="Verify your email">
      <YStack gap="$3" alignItems="flex-start">
        {status === 'verifying' ? (
          <Text fontSize="$2" color="$textSecondary">
            Verifying your email...
          </Text>
        ) : null}

        {status === 'success' ? (
          <>
            <Text fontSize="$2" color="$textSecondary">
              Your email has been verified. You're all set.
            </Text>
            <Theme name="celluloid_accent">
              <Button onPress={onGoToLogin} size="$4">
                Continue
              </Button>
            </Theme>
          </>
        ) : null}

        {status === 'error' ? (
          <>
            <Text fontSize="$2" color="$danger">
              {errorMessage ?? 'This verification link is invalid or has expired.'}
            </Text>
            {resent ? (
              <Text fontSize="$2" color="$textSecondary">
                We've sent a new verification link to your email.
              </Text>
            ) : (
              <Theme name="celluloid_accent">
                <Button onPress={onResend} disabled={isResending} size="$4">
                  Resend verification email
                </Button>
              </Theme>
            )}
          </>
        ) : null}

        {status === 'pending' ? (
          <Text fontSize="$2" color="$textSecondary">
            We've sent a verification link to your email. Click it to activate your account.
          </Text>
        ) : null}
      </YStack>
    </AuthLayout>
  );
}
