import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormValues, loginSchema } from '../../schemas/auth';
import { useForm } from 'react-hook-form';

export interface useLoginFormProps {
  defaultValues?: LoginFormValues;
}

export const useLoginForm = ({ defaultValues }: useLoginFormProps) => {
  const DEFAULT_VALUES: LoginFormValues = {
    email: '',
    password: '',
    remember: false,
  };

  return useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });
};
