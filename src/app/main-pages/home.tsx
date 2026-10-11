import CustomInput from '@/shared/components/custom-ui/custom-input';
import { Button } from '@/shared/components/ui/button';
import type { RootState } from '@/store/store';
import { ArrowUpRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { locale } = useParams();
  return (
    <div>
      <h1>{user?.firstName}</h1>
      Home page
      <CustomInput variant="default" subVariant="first-name" />
      <CustomInput variant="default" subVariant="last-name" />
      <CustomInput variant="email" />
      <Link to={`/${locale}/forgot-password`}>Forgot Password?</Link>
      <CustomInput variant="otp" error={true} />
      <CustomInput variant="search" />
      <CustomInput variant="password" subVariant="password" />
      <CustomInput variant="password" subVariant="new-password" />
      <CustomInput variant="password" subVariant="confirm-new-password" disabled={true} />
      <Button variant="outline" icon={<ArrowUpRight />}>
        Explore More
      </Button>
      <Button variant="ghost" icon={<ArrowUpRight />}>
        Get Started
      </Button>
      <Link to={`/${locale}/profile`}>Profile</Link>
    </div>
  );
};

export default Home;
