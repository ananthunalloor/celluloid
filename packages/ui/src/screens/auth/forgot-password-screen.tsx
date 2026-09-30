import { Controller } from 'react-hook-form';
import { YStack, XStack, Text, Button, Theme } from 'tamagui';
import { AuthLayout } from './auth-layout';
import { FormField } from './form-field';
import { type ForgotPasswordFormValues } from '../../schemas/auth';
import { useForgotPasswordForm } from './use-forgot-password.form';

export interface ForgotPasswordScreenProps {
  onSubmit?: (values: ForgotPasswordFormValues) => void;
  onGoToLogin?: () => void;
  isSubmitting?: boolean;
  submitted?: boolean;
}

export function ForgotPasswordScreen({
  onSubmit,
  onGoToLogin,
  isSubmitting,
  submitted,
}: ForgotPasswordScreenProps) {
  const { control, handleSubmit } = useForgotPasswordForm({});

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a link to reset your password"
    >
      {submitted ? (
        <YStack gap="$3">
          <Text fontSize="$2" color="$textSecondary">
            If an account exists for that email, we've sent instructions to reset your password.
          </Text>
        </YStack>
      ) : (
        <>
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <FormField
                label="Email"
                placeholder="you@example.com"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                autoCapitalize="none"
                keyboardType="email-address"
                error={fieldState.error?.message}
              />
            )}
          />

          <Theme name="celluloid_accent">
            <Button
              onPress={handleSubmit((values) => onSubmit?.(values))}
              disabled={isSubmitting}
              size="$4"
            >
              Send reset link
            </Button>
          </Theme>
        </>
      )}

      <XStack justifyContent="center" gap="$1.5">
        <Text
          fontSize="$2"
          color="$accent6"
          fontWeight="500"
          cursor="pointer"
          onPress={onGoToLogin}
        >
          Back to login
        </Text>
      </XStack>
    </AuthLayout>
  );
}
