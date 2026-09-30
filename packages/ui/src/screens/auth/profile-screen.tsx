import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { YStack, XStack, Text, Button, Theme } from 'tamagui';
import { FormField } from './form-field';
import { type ProfileFormValues } from '../../schemas/auth';
import { useProfileForm } from './use-profile.form';

export interface ProfileUser {
  email: string;
  name: string;
  verification_level: 'unverified' | 'verified';
}

export interface ProfileScreenProps {
  user: ProfileUser;
  onSave?: (values: ProfileFormValues) => void;
  isSaving?: boolean;
  onResendVerification?: () => void;
  isResendingVerification?: boolean;
  resent?: boolean;
  onLogout?: () => void;
}

export function ProfileScreen({
  user,
  onSave,
  isSaving,
  onResendVerification,
  isResendingVerification,
  resent,
  onLogout,
}: ProfileScreenProps) {
  const { control, handleSubmit, reset } = useProfileForm({ defaultValues: { name: user.name } });

  useEffect(() => {
    reset({ name: user.name });
  }, [user.name, reset]);

  const isVerified = user.verification_level === 'verified';

  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      padding="$4"
      background="$background"
    >
      <YStack
        width="100%"
        maxWidth={420}
        gap="$4"
        padding="$5"
        borderRadius="$4"
        borderWidth={1}
        borderColor="$borderColor"
        backgroundColor="$backgroundHover"
      >
        <YStack gap="$1">
          <Text fontFamily="$heading" fontSize="$7" fontWeight="500" color="$color">
            Your profile
          </Text>
        </YStack>

        <YStack gap="$2">
          <Text fontSize="$1" fontWeight="500" color="$textSecondary">
            Email
          </Text>
          <Text fontSize="$3" color="$color">
            {user.email}
          </Text>
        </YStack>

        <XStack alignItems="center" gap="$2">
          <YStack
            paddingHorizontal="$2"
            paddingVertical="$1"
            borderRadius="$10"
            backgroundColor={isVerified ? '$success' : '$warning'}
          >
            <Text fontSize="$1" fontWeight="600" color="white">
              {isVerified ? 'Verified' : 'Unverified'}
            </Text>
          </YStack>

          {!isVerified ? (
            resent ? (
              <Text fontSize="$1" color="$textSecondary">
                Verification email sent
              </Text>
            ) : (
              <Text
                fontSize="$1"
                color="$accent6"
                fontWeight="500"
                cursor="pointer"
                onPress={onResendVerification}
                opacity={isResendingVerification ? 0.5 : 1}
              >
                Resend verification email
              </Text>
            )
          ) : null}
        </XStack>

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

        <Theme name="celluloid_accent">
          <Button
            onPress={handleSubmit((values) => onSave?.(values))}
            disabled={isSaving}
            size="$4"
          >
            Save changes
          </Button>
        </Theme>

        <Text
          fontSize="$2"
          color="$textSecondary"
          fontWeight="500"
          cursor="pointer"
          onPress={onLogout}
        >
          Log out
        </Text>
      </YStack>
    </YStack>
  );
}
