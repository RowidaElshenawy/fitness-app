import type { ReactNode } from 'react';

export type TLoginRegisterDesignProps = {
  children: ReactNode;
  buttonTitle: string;
  spanTitle: string;
  linkTitle: string;
  title: string;
  forgotPassword: string;
  or: string;
  href: string;
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
};
