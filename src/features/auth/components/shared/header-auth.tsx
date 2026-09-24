import { cn } from '@/shared/lib/utils/tailwind-cn';
import type { THeaderAuthProps } from '../../types/header-auth';

const HeaderAuth = ({
  subtitle,
  title,
  className,
  subtitlePosition = 'before',
}: THeaderAuthProps) => {
  return (
    <>
      <h3
        className={cn(
          'font-sans font-normal text-2xl text-text-inverse text-center leading-13',
          className
        )}
      >
        {subtitlePosition === 'before' && <span className="text-lg block">{subtitle}</span>}
        {title}
        {subtitlePosition === 'after' && <span className="text-lg block">{subtitle}</span>}
      </h3>
    </>
  );
};

export default HeaderAuth;
