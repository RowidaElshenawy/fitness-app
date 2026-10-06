import { useTranslation } from 'react-i18next';

interface SecHeaderProps {
  titleKey: string;
  className?: string;
}

export default function SecHeader({ titleKey, className = '' }: SecHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className={`flex gap-2 ${className}`}>
      <img
        src="/images/background-image.png"
        alt="dumbell photo "
        className="h-[34px] w-[34px]   "
      />

      <h3 className=" pt-1.5   text-sm  font-semibold text-text-primary ">{t(titleKey)}</h3>
    </div>
  );
}
