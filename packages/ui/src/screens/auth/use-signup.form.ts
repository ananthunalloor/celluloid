import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormValues, signupSchema } from '../../schemas/auth';
import { useForm } from 'react-hook-form';

export interface useSignupFormProps {
  defaultValues?: SignupFormValues;
}

export const useSignupForm = ({ defaultValues }: useSignupFormProps = {}) => {
  const DEFAULT_VALUES: SignupFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  };

  return useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
  });
};
