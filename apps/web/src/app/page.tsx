'use client';

import { Button, YStack } from '@celluloid/ui';

export default function Index() {
  return (
    <YStack flex={1} padding="$4" gap="$4" alignItems="flex-start">
      <Button>Celluloid</Button>
      <Button>Accent</Button>
    </YStack>
  );
}
