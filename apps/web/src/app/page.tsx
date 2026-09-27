'use client';

import { Button, YStack } from '@celluloid/ui';
import { Text } from '@tamagui/web';

import { useTranslations } from 'next-intl';

export default function Index() {
  const t = useTranslations();

  return (
    <YStack flex={1} padding="$4" gap="$4" alignItems="flex-start">
      <Text>{t('navigation.anime')}</Text>
      <Button>Celluloid</Button>
      <Button>Accent</Button>
    </YStack>
  );
}
