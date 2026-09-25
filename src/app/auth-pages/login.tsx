import LoginForm from '@/features/auth/components/login/login-form';
import HeaderAuth from '@/features/auth/components/shared/header-auth';

const Login = () => {
  return (
    <>
      <HeaderAuth subtitle="Hey There," title="WELCOME BACK!" />
      <LoginForm />
    </>
  );
};

export default Login;
