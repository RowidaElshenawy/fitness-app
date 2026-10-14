import MealsSection from '@/features/main/components/meals-section/meals-section';
import WhyUs from '@/features/main/components/why-us-section/why-us';
import Workouts from '@/features/main/components/workouts-section/workouts';
import { Button } from '@/shared/components/ui/button';
import type { RootState } from '@/store/store';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const { locale } = useParams();

  const handleClick = async () => {
    setIsLoading(true);

    // محاكاة API request
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
  };

  return (
    <div>
      <h1>{user?.firstName}</h1>
      <Button type="submit" loading={isLoading} onClick={handleClick}>
        NEXT
      </Button>
      <div>
        <h1>{user?.firstName}</h1>

        <Button variant="outline" icon={<ArrowUpRight />}>
          Explore More
        </Button>
        <Button variant="ghost" icon={<ArrowUpRight />}>
          Get Started
        </Button>
        <Link to={`/${locale}/profile`}>Profile</Link>
        <WhyUs />
        <Workouts />
        <MealsSection />
      </div>
    </div>
  );
};

export default Home;
