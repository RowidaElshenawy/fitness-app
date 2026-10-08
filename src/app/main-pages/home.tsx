import AboutSection from '@/shared/components/about.tsx/about';
import CustomInput from '@/shared/components/custom-ui/custom-input';
import FitnessCard from '@/shared/components/custom-ui/fitness-card';
import WorkoutTabs from '@/shared/components/custom-ui/tabs';

const Home = () => {
  return (
    <div>
      Home page
      <AboutSection />
      <WorkoutTabs />
      <FitnessCard title="Yoga" image="/images/yoga.jpg" />
      <CustomInput variant="default" subVariant="first-name" />
      <CustomInput variant="default" subVariant="last-name" />
      <CustomInput variant="email" />
      <CustomInput variant="otp" error={true} />
      <CustomInput variant="search" />
      <CustomInput variant="password" subVariant="password" />
      <CustomInput variant="password" subVariant="new-password" />
      <CustomInput variant="password" subVariant="confirm-new-password" disabled={true} />
    </div>
  );
};

export default Home;
