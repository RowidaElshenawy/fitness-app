import Hero from '@/features/main/components/hero';
import MealsSection from '@/features/main/components/meals-section/meals-section';
import WhyUs from '@/features/main/components/why-us-section/why-us';
import Workouts from '@/features/main/components/workouts-section/workouts';
import type { RootState } from '@/store/store';

import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { locale } = useParams();

  return (
    <div>
      <h1>{user?.firstName}</h1>

      <div>
        <Hero />
        <Link to={`/${locale}/profile`}>Profile</Link>
        <WhyUs />
        <Workouts />
        <MealsSection />
      </div>
    </div>
  );
};

export default Home;
