import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ProfileFormValues, profileSchema } from '../../schemas/auth';

export interface useProfileFormProps {
  defaultValues?: ProfileFormValues;
}

export const useProfileForm = ({ defaultValues }: useProfileFormProps = {}) => {
  const DEFAULT_VALUES: ProfileFormValues = { name: '' };

  return useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });
};
