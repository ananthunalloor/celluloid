import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ForgotPasswordFormValues, forgotPasswordSchema } from '../../schemas/auth';

export interface useForgotPasswordFormProps {
  defaultValues?: ForgotPasswordFormValues;
}

export const useForgotPasswordForm = ({ defaultValues }: useForgotPasswordFormProps = {}) => {
  const DEFAULT_VALUES: ForgotPasswordFormValues = { email: '' };

  return useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });
};
