import { useTranslation } from 'react-i18next';

import { cn } from '@/shared/lib/utils/tailwind-cn';

interface SecHeaderProps {
  titleKey: string;
  className?: string;
  titleClassName?: string;
}

export default function SecHeader({ titleKey, className = '', titleClassName }: SecHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className={`flex gap-2 ${className}`}>
      <img
        src="/images/background-image.png"
        alt="dumbell photo "
        className="h-[34px] w-[34px]   "
      />

      <h3 className={cn('pt-1.5 text-sm font-semibold text-text-primary', titleClassName)}>
        {t(titleKey)}
      </h3>
    </div>
  );
}
