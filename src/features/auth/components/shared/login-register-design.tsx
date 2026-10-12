import HeaderAuth from './header-auth';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import type { TLoginRegisterDesignProps } from '../../types/login-register-design';

const LoginRegisterDesign = ({
  children,
  buttonTitle,
  spanTitle,
  linkTitle,
  title,
  forgotPassword,
  or,
  href,
  form,
  onSubmit,
}: TLoginRegisterDesignProps) => {
  const { locale = 'en' } = useParams();
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col  items-center p-4  sm:p-10 mt-12.5 border border-border-muted w-full   lg:w-121.5 rounded-xl"
    >
      <div className="flex flex-col gap-6 items-center w-full px-4 sm:px-10">
        <div className="w-full flex flex-col gap-2 ">
          <div className=" flex flex-col  gap-4 w-full">
            <HeaderAuth title={title} />
            {children}
          </div>
          <Link
            to={`/${locale}/forgot-password`}
            className="self-end font-sans font-bold text-base  text-text-primary transition-all duration-300 ease-in-out hover:underline"
          >
            {forgotPassword}
          </Link>
        </div>
        <span className="flex items-center gap-5 font-sans font-normal text-sm text-text-subtle relative before:content-[''] before:w-20 before:h-0.5 before:bg-bg-soft after:content-['']  after:w-20 after:h-0.5 after:bg-bg-soft">
          {or}
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
          className="w-full font-sans font-extrabold text-base"
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
