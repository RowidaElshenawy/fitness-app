import Hero from '@/features/main/components/hero';
import MealsSection from '@/features/main/components/meals-section/meals-section';
import WhyUs from '@/features/main/components/why-us-section/why-us';
import Workouts from '@/features/main/components/workouts-section/workouts';
import About from './about';
const Home = () => {
  return (
    <div>
      {/* hello */}
      <Hero />
      <About />
      <Workouts />
      <WhyUs />
      <MealsSection />
    </div>
  );
};

export default Home;
