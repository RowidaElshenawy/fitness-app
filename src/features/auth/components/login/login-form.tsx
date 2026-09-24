import CustomInput from '@/shared/components/custom-ui/custom-input';
import LoginRegisterDesign from '../shared/login-register-design';
import { Controller, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
const LoginForm = () => {
  //form
  const form = useForm({
    // resolver:zodResolver(),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  //function
  const onSubmit = 2;

  return (
    <>
      <LoginRegisterDesign
        buttonTitle="Login"
        spanTitle="Dont have an account yet ? "
        linkTitle="Register"
        href="/:locale/register"
        form={form}
        onSubmit={onSubmit}
      >
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomInput variant="email" {...field} error={fieldState.invalid} />
          )}
        />

        <CustomInput variant="password" subVariant="password" />
      </LoginRegisterDesign>
    </>
  );
};

export default LoginForm;
