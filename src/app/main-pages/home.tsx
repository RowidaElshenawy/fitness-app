import { Link } from 'react-router-dom';

import CustomInput from '@/shared/components/custom-ui/custom-input';
import { Button } from '@/shared/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const Home = () => {
  return (
    <div>
      Home page
      <CustomInput variant="default" subVariant="first-name" />
      <CustomInput variant="default" subVariant="last-name" />
      <CustomInput variant="email" />
      <Link to={'forgot-password'}>Forgot Password?</Link>
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
    </div>
  );
};

export default Home;
