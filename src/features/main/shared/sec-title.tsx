import { Trans, useTranslation } from 'react-i18next';

import { cn } from '@/shared/lib/utils/tailwind-cn';

type TitleProps = {
  translationKey: string;
  className?: string;
};

export default function SecTitle({ translationKey, className }: TitleProps) {
  const { i18n } = useTranslation();

  return (
    <h2
      className={cn('text-xl pb-5.5 md:text-3xl font-bold text-text-plain  uppercase', className)}
    >
      <Trans
        i18nKey={translationKey}
        tOptions={{ lng: i18n.language }}
        components={{
          highlight: <span className="text-text-primary" />,
        }}
      />
    </h2>
  );
}
