import { cn } from '@/shared/lib/utils/tailwind-cn';
import type { THeaderAuthProps } from '../../types/header-auth';

const HeaderAuth = ({
  subtitle,
  title,
  className,
  subtitlePosition = 'before',
}: THeaderAuthProps) => {
  return (
    <div className="text-center">
      <h3
        className={cn(
          'font-sans font-extrabold text-2xl text-text-inverse text-center leading-13',
          className
        )}
      >
        {subtitlePosition === 'before' && (
          <span className=" font-normal text-lg block">{subtitle}</span>
        )}
        {title}

        {subtitlePosition === 'after' && (
          <span className="text-sm md:text-base font-normal text-gray-300 opacity-90 mt-1.5 block">
            {subtitle}
          </span>
        )}
      </h3>
    </div>
  );
};

export default HeaderAuth;
