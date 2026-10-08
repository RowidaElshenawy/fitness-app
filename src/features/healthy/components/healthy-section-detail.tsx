import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import MasterDetailLayout from '@/features/main/shared/detail-layout';
import TabsSkeleton from '@/features/main/skeleton/tabs-skeleton';

import { useMealCategories } from '../hooks/use-meal-categories';
import { useMealsByCategory } from '../hooks/use-meals-by-category';
import { useMealDetails } from '../hooks/use-meal-details';
import ErrorState from './error-state';
import IngredientsTable from './ingredients-table';
import MealHero from './meal-hero';
import MealListItem from './meal-list-item';
import { MealDetailsSkeleton, MealsListSkeleton } from '../../main/skeleton/healthy-skeletons';
import { getIngredients } from '../lib/get-ingredients';

export default function HealthySection() {
  //translation
  const { t } = useTranslation();
  //initial selection coming from the url: /healthy/:mealId?category=...
  const { mealId } = useParams();
  const [searchParams] = useSearchParams();
  //state
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    () => searchParams.get('category') ?? undefined
  );
  const [selectedMealId, setSelectedMealId] = useState<string | undefined>(mealId);
  //queries
  const categories = useMealCategories();

  // the meal from the url, used to find its category when ?category is missing
  const requestedMeal = useMealDetails(selectedMealId);
  const waitingForMeal = !!selectedMealId && !selectedCategory && requestedMeal.isPending;

  const activeCategory =
    selectedCategory ??
    requestedMeal.data?.strCategory ??
    (waitingForMeal ? undefined : categories.data?.[0]?.strCategory);
  const meals = useMealsByCategory(activeCategory);

  const activeMealId = selectedMealId ?? meals.data?.[0]?.idMeal;
  const meal = useMealDetails(activeMealId);
  //derived
  const listError = categories.isError || meals.isError;
  const listLoading = categories.isPending || meals.isPending;

  const handleListRetry = () => {
    if (categories.isError) categories.refetch();
    if (meals.isError) meals.refetch();
  };

  const renderList = () => {
    if (listError) return <ErrorState onRetry={handleListRetry} />;
    if (listLoading) return <MealsListSkeleton />;
    if (meals.data.length === 0) {
      return <p className="py-16 text-center text-text-plain">{t('main.healthy.empty')}</p>;
    }

    return (
      <ul>
        {meals.data.map((item) => (
          <MealListItem
            key={item.idMeal}
            meal={item}
            active={item.idMeal === activeMealId}
            onSelect={setSelectedMealId}
          />
        ))}
      </ul>
    );
  };

  const renderDetails = () => {
    if (listError) return null;
    if (listLoading || (activeMealId && meal.isPending)) return <MealDetailsSkeleton />;
    if (meal.isError) return <ErrorState onRetry={() => meal.refetch()} />;
    if (!meal.data) return null;

    return (
      <>
        <MealHero key={meal.data.idMeal} meal={meal.data} />
        <IngredientsTable ingredients={getIngredients(meal.data)} />
      </>
    );
  };

  return (
    <MasterDetailLayout
      bgImage={meal.data?.strMealThumb}
      bgWord={t('main.healthy.bg-word')}
      sidebar={
        <>
          <div className="overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.isPending ? (
              <TabsSkeleton />
            ) : (
              <Tabs
                value={activeCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value);
                  setSelectedMealId(undefined);
                }}
                className="w-max"
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

          <div className="max-h-160 min-h-0 flex-1 overflow-y-auto scrollbar-hide md:max-h-none">
            {renderList()}
          </div>
        </>
      }
    >
      {renderDetails()}
    </MasterDetailLayout>
  );
}
