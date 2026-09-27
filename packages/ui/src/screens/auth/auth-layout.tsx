import type { ReactNode } from 'react';
import { YStack, Text } from 'tamagui';

export interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
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
        maxWidth={360}
        gap="$3"
        padding="$5"
        borderRadius="$4"
        borderWidth={1}
        borderColor="$borderColor"
        backgroundColor="$backgroundHover"
      >
        <YStack gap="$1">
          <Text fontFamily="$heading" fontSize="$7" fontWeight="500" color="$color">
            {title}
          </Text>
          {subtitle ? (
            <Text fontSize="$2" color="$textSecondary" lineHeight="$2">
              {subtitle}
            </Text>
          ) : null}
        </YStack>

        {children}
      </YStack>
    </YStack>
  );
}
