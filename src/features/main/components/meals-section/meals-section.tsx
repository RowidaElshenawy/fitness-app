import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import workoutsBg from '/images/meals-bg.jpg';
import { Button } from '@/shared/components/ui/button';

import SectionBgWord from '../../shared/sec-bg-word';
import { useMeals } from '@/features/main/hooks/use-meals';
import CardGrid, { type CardGridItem } from './meals-grid';
import Title from './meals-title';

// TheMealDB has no Lunch/Dinner categories, so map the design's labels to real ones.
const MEALS = [
  { key: 'breakfast', category: 'Breakfast' },
  { key: 'lunch', category: 'Chicken' },
  { key: 'dinner', category: 'Seafood' },
] as const;

export default function MealsSection() {
  //translation
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { locale } = useParams();
  //queries
  const { data, isPending, isError, refetch } = useMeals();

  const items = useMemo<CardGridItem[]>(
    () =>
      MEALS.flatMap(({ key, category }) => {
        const cat = data?.find((c) => c.strCategory === category);
        return cat
          ? [
              {
                id: cat.idCategory,
                title: t(`meals.items.${key}`),
                image: cat.strCategoryThumb,
                href: `/${locale}/healthy?category=${cat.strCategory}`, // was /meals/...
              },
            ]
          : [];
      }),
    [data, locale, t]
  );

  const handleItemClick = (item: CardGridItem) => {
    navigate(item.href);
  };

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-cover bg-center bg-no-repeat h-176.25"
      style={{ backgroundImage: `url(${workoutsBg})` }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-14 z-0 h-104 bg-white/60 backdrop-blur-md dark:bg-[#242424]/60"
      />

      <SectionBgWord>{t('meals.bg-word')}</SectionBgWord>

      <div className="relative z-10 mx-auto max-w-360 px-4 pt-12 pb-8 md:px-20">
        <Title />

        <div className="mt-9">
          {isError ? (
            <div className="flex flex-col items-center gap-4 py-16 text-text-plain">
              <p>{t('meals.error')}</p>
              <Button variant="outline" onClick={() => refetch()}>
                {t('meals.retry')}
              </Button>
            </div>
          ) : !isPending && !items.length ? (
            <p className="py-16 text-center text-text-plain">{t('meals.empty')}</p>
          ) : (
            <CardGrid
              items={items}
              isLoading={isPending}
              actionLabel={t('meals.read-more')}
              onItemClick={handleItemClick}
            />
          )}
        </div>
      </div>
    </section>
  );
}
