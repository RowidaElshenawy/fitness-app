// features/main/components/HeroStats.tsx
import { useTranslation } from 'react-i18next';
import { HERO_STATS } from '../shared/constants';

export default function HeroStats() {
  const { t } = useTranslation();

  return (
    <ul className="flex flex-col gap-10 md:flex-row ">
      {HERO_STATS.map(({ value, labelKey }) => (
        <li key={labelKey}>
          <p className="text-xl font-bold text-text-plain">{value}</p>
          <p className="text-sm text-text-plain">{t(labelKey)}</p>
        </li>
      ))}
    </ul>
  );
}
