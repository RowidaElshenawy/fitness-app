import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import workoutsBg from '@/assets/workouts-bg.png';
import { Button } from '@/shared/components/ui/button';
import { Card, CardAction, CardImage, CardOverlay, CardTitle } from '@/shared/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { useMealCategories } from '@/features/healthy/hooks/use-meal-categories';
import { useMealsByCategory } from '@/features/healthy/hooks/use-meals-by-category';
import SectionBgWord from '@/features/main/shared/sec-bg-word';
import SecHeader from '@/features/main/shared/sec-header';
import TabsSkeleton from '@/features/main/skeleton/tabs-skeleton';
import SecTitle from '@/features/main/shared/sec-title';

const MEALS_LIMIT = 6;

function MealCardsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: MEALS_LIMIT }, (_, i) => (
        <div key={i} className="aspect-square w-full animate-pulse rounded-2xl bg-bg-soft" />
      ))}
    </div>
  );
}

export default function MealSection() {
  //translation
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { locale } = useParams();
  //state
  const [selectedCategory, setSelectedCategory] = useState<string>();
  //queries
  const categories = useMealCategories();
  const activeCategory = selectedCategory ?? categories.data?.[0]?.strCategory;
  const meals = useMealsByCategory(activeCategory);

  const isError = categories.isError || meals.isError;
  const isLoading = categories.isPending || meals.isPending;

  const handleRetry = () => {
    if (categories.isError) categories.refetch();
    if (meals.isError) meals.refetch();
  };

  const handleExplore = (mealId: string) => {
    if (!activeCategory) return;
    navigate(`/${locale}/healthy/${mealId}?category=${encodeURIComponent(activeCategory)}`);
  };
  const renderMeals = () => {
    if (isError) {
      return (
        <div className="flex flex-col items-center gap-4 py-16 text-text-plain">
          <p>{t('main.healthy.error')}</p>
          <Button variant="outline" onClick={handleRetry}>
            {t('main.healthy.retry')}
          </Button>
        </div>
      );
    }
    if (isLoading) return <MealCardsSkeleton />;
    if (meals.data.length === 0) {
      return <p className="py-16 text-center text-text-plain">{t('main.healthy.empty')}</p>;
    }

    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {meals.data.slice(0, MEALS_LIMIT).map((meal) => (
          <Card
            key={meal.idMeal}
            className="aspect-square max-w-none cursor-pointer"
            onClick={() => handleExplore(meal.idMeal)}
          >
            <CardImage src={meal.strMealThumb} alt={meal.strMeal} />

            <CardOverlay className="flex-col items-start justify-normal gap-2">
              <CardTitle className="line-clamp-1 w-full text-lg tracking-widest">
                {meal.strMeal}
              </CardTitle>

              <CardAction className="gap-3">{t('main.workouts.explore')}</CardAction>
            </CardOverlay>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${workoutsBg})` }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-0 h-full bg-white/60 backdrop-blur-md dark:bg-[#242424]/60"
      />

      <SectionBgWord>{t('main.healthy.bg-word')}</SectionBgWord>

      <div className="relative z-10 mx-auto max-w-360 px-4 pt-12 pb-12 md:px-8 xl:px-20">
        <SecHeader titleKey="sec-header.healthy-nutritions" className="justify-center" />

        <SecTitle
          translationKey="why-us.sec-title.healthy-nutritions"
          className="mx-auto mt-8 max-w-2xl text-center text-3xl leading-normal md:text-4xl"
        />

        <div className="mt-9 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.isPending ? (
            <TabsSkeleton />
          ) : (
            <Tabs
              value={activeCategory}
              onValueChange={setSelectedCategory}
              className="mx-auto w-max"
            >
              <TabsList variant="pill">
                {categories.data?.map((category) => (
                  <TabsTrigger key={category.idCategory} value={category.strCategory}>
                    {category.strCategory}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
        </div>

        <div className="mt-8">{renderMeals()}</div>
      </div>
    </section>
  );
}
