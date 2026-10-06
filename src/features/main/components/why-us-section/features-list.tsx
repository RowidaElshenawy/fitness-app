import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

const stepKeys = ['personalized-plans', 'results-driven', 'equipment'] as const;

export default function FeatureList({ className = '', ...props }: ComponentProps<'ol'>) {
  const { t } = useTranslation();

  return (
    <ol className={` max-w-md list-none p-0 ${className}`} {...props}>
      {stepKeys.map((key, i) => {
        const isLast = i === stepKeys.length - 1;
        return (
          <li key={key} className={`relative flex gap-6 ${isLast ? '' : 'pb-9'}`}>
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute bottom-1 start-[29px] top-16 w-0.5 bg-border-primary-fade"
              />
            )}

            <span
              aria-hidden="true"
              className="relative z-10 grid size-15 shrink-0 place-items-center rounded-full border border-border-primary-fade bg-bg-primary text-lg font-semibold text-white"
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            <div>
              <h3 className="mb-1.5 text-md-custom font-bold leading-snug text-text-plain">
                {t(`why-us.features.${key}.title`)}
              </h3>
              <p className="text-base leading-relaxed text-text-plain">
                {t(`why-us.features.${key}.description`)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
