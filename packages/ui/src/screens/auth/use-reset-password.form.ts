import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ResetPasswordFormValues, resetPasswordSchema } from '../../schemas/auth';

export interface useResetPasswordFormProps {
  defaultValues?: ResetPasswordFormValues;
}

export const useResetPasswordForm = ({ defaultValues }: useResetPasswordFormProps = {}) => {
  const DEFAULT_VALUES: ResetPasswordFormValues = { password: '', confirmPassword: '' };

  return useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });
};
