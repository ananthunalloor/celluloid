import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { YStack, XStack, Text, Button, Theme } from 'tamagui';
import { AuthLayout } from './AuthLayout';
import { FormField } from './FormField';
import { loginSchema, type LoginFormValues } from '../schemas/auth';

export interface LoginScreenProps {
  onSubmit?: (values: LoginFormValues) => void;
  onForgotPassword?: () => void;
  onGoToSignup?: () => void;
}

export function LoginScreen({ onSubmit, onForgotPassword, onGoToSignup }: LoginScreenProps) {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false },
  });

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to keep track of what you've watched">
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
            placeholder="••••••••"
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            secureTextEntry
            error={fieldState.error?.message}
          />
        )}
      />

      <XStack justifyContent="space-between" alignItems="center">
        <Controller
          control={control}
          name="remember"
          render={({ field }) => (
            <XStack
              alignItems="center"
              gap="$2"
              onPress={() => field.onChange(!field.value)}
              cursor="pointer"
            >
              <YStack
                width={14}
                height={14}
                borderRadius="$1"
                backgroundColor={field.value ? '$accent6' : 'transparent'}
                borderWidth={1}
                borderColor={field.value ? '$accent6' : '$borderColor'}
              />
              <Text fontSize="$1" color="$textSecondary">
                Remember me
              </Text>
            </XStack>
          )}
        />

        <Text
          fontSize="$1"
          color="$accent6"
          fontWeight="500"
          cursor="pointer"
          onPress={onForgotPassword}
        >
          Forgot password?
        </Text>
      </XStack>

      <Theme name="celluloid_accent">
        <Button onPress={handleSubmit((values) => onSubmit?.(values))} size="$4">
          Log in
        </Button>
      </Theme>

      <XStack justifyContent="center" gap="$1.5">
        <Text fontSize="$2" color="$textSecondary">
          Don&apos;t have an account?
        </Text>
        <Text fontSize="$2" color="$accent6" fontWeight="500" cursor="pointer" onPress={onGoToSignup}>
          Sign up
        </Text>
      </XStack>
    </AuthLayout>
  );
}
