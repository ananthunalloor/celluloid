import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { XStack, Text, Button, Theme } from 'tamagui';
import { AuthLayout } from './AuthLayout';
import { FormField } from './FormField';
import { signupSchema, type SignupFormValues } from '../schemas/auth';

export interface SignupScreenProps {
  onSubmit?: (values: SignupFormValues) => void;
  onGoToLogin?: () => void;
}

export function SignupScreen({ onSubmit, onGoToLogin }: SignupScreenProps) {
  const { control, handleSubmit } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Celluloid to write reviews and track what you watch"
    >
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <FormField
            label="Name"
            placeholder="Your name"
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />

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

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <FormField
            label="Password"
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
            placeholder="Repeat your password"
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            secureTextEntry
            error={fieldState.error?.message}
          />
        )}
      />

      <Theme name="celluloid_complementary">
        <Button onPress={handleSubmit((values) => onSubmit?.(values))} size="$4">
          Create account
        </Button>
      </Theme>

      <XStack justifyContent="center" gap="$1.5">
        <Text fontSize="$2" color="$textSecondary">
          Already have an account?
        </Text>
        <Text fontSize="$2" color="$accent6" fontWeight="500" cursor="pointer" onPress={onGoToLogin}>
          Log in
        </Text>
      </XStack>
    </AuthLayout>
  );
}
