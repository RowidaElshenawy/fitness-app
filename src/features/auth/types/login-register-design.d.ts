import type { ReactNode } from 'react';

export type TLoginRegisterDesignProps = {
  children: ReactNode;
  buttonTitle: string;
  spanTitle: string;
  linkTitle: string;
  href: string;
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
};
