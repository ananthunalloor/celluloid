import { Controller } from 'react-hook-form';
import { Text, Button, Theme } from 'tamagui';
import { AuthLayout } from './auth-layout';
import { FormField } from './form-field';
import { type ResetPasswordFormValues } from '../../schemas/auth';
import { useResetPasswordForm } from './use-reset-password.form';

export interface ResetPasswordScreenProps {
  onSubmit?: (values: ResetPasswordFormValues) => void;
  isSubmitting?: boolean;
  success?: boolean;
  error?: string;
}

export function ResetPasswordScreen({
  onSubmit,
  isSubmitting,
  success,
  error,
}: ResetPasswordScreenProps) {
  const { control, handleSubmit } = useResetPasswordForm({});

  return (
    <AuthLayout title="Choose a new password" subtitle="Enter and confirm your new password">
      {success ? (
        <Text fontSize="$2" color="$textSecondary">
          Your password has been reset. You can now log in with your new password.
        </Text>
      ) : (
        <>
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <FormField
                label="New password"
                placeholder="At least 8 characters"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                secureTextEntry
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormField
                label="Confirm password"
                placeholder="Repeat your new password"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                secureTextEntry
                error={fieldState.error?.message}
              />
            )}
          />

          {error ? (
            <Text fontSize="$1" color="$danger">
              {error}
            </Text>
          ) : null}

          <Theme name="celluloid_accent">
            <Button
              onPress={handleSubmit((values) => onSubmit?.(values))}
              disabled={isSubmitting}
              size="$4"
            >
              Reset password
            </Button>
          </Theme>
        </>
      )}
    </AuthLayout>
  );
}
