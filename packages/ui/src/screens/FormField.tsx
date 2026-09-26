import { YStack, Text, Input, type InputProps } from 'tamagui';

export interface FormFieldProps extends InputProps {
  label: string;
  error?: string;
}

export function FormField({ label, error, ...inputProps }: FormFieldProps) {
  return (
    <YStack gap="$1">
      <Text fontSize="$1" fontWeight="500" color="$textSecondary">
        {label}
      </Text>
      <Input
        borderColor={error ? '$danger' : '$borderColor'}
        focusStyle={{ borderColor: error ? '$danger' : '$accent6' }}
        backgroundColor="$background"
        color="$color"
        placeholderTextColor="$textMuted"
        size="$4"
        {...inputProps}
      />
      {error ? (
        <Text fontSize="$1" color="$danger">
          {error}
        </Text>
      ) : null}
    </YStack>
  );
}
