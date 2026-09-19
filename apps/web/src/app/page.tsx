'use client';

import { Button, Theme, YStack } from '@org/ui';

export default function Index() {
  return (
    <YStack flex={1} padding="$4" gap="$4" background="$background">
      <Button>Celluloid</Button>

      <Theme name="celluloid_accent">
        <Button>Accent</Button>
      </Theme>
    </YStack>
  );
}
