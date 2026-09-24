import HeaderAuth from './header-auth';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import type { TLoginRegisterDesignProps } from '../../types/login-register-design';

const LoginRegisterDesign = ({
  children,
  buttonTitle,
  spanTitle,
  linkTitle,
  href,
  form,
  onSubmit,
}: TLoginRegisterDesignProps) => {
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col  items-center p-10 mt-12.5 border border-border-muted max-w-121.5 rounded-xl"
    >
      <div className="flex flex-col gap-6 items-center w-full px-10">
        <div className="w-full flex flex-col gap-2 ">
          <div className=" flex flex-col  gap-4 w-full">
            <HeaderAuth title="Login" className="font-extrabold" />
            {children}
          </div>
          <Link
            to="/:locale/forgot-password"
            className="self-end font-sans font-bold text-base  text-text-primary transition-all duration-300 ease-in-out hover:underline"
          >
            Forget Password ?
          </Link>
        </div>
        <span className="block font-sans font-normal text-sm text-text-subtle relative before:content-[''] before:w-20 before:h-0.5 before:bg-bg-soft after:content-['']  after:w-20 after:h-0.5 after:bg-bg-soft">
          Or
        </span>
        <div className="flex gap-4 ">
          <span className="w-8 h-8 bg-bg-inverse rounded-full flex  items-center justify-center">
            <i className="fa-brands fa-facebook-f"></i>
          </span>
          <span className="w-8 h-8 bg-bg-inverse rounded-full flex  items-center justify-center">
            <i className="fa-brands fa-google"></i>
          </span>
          <span className="w-8 h-8 bg-bg-inverse rounded-full flex  items-center justify-center">
            <i className="fa-brands fa-apple"></i>
          </span>
        </div>
        <Button
          variant="primary"
          className="w-full"
          disabled={form.formState.isSubmitted && !form.formState.isValid}
          type="submit"
        >
          {buttonTitle}
        </Button>
      </div>
      <span className="font-sans font-normal text-base text-text-inverse mt-2">
        {spanTitle}
        <Link
          to={href}
          className="font-bold text-text-primary transition-all duration-300 ease-in-out hover:underline"
        >
          {linkTitle}
        </Link>
      </span>
    </form>
  );
};

export default LoginRegisterDesign;
