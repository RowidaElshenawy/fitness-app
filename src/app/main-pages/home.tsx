import WhyUs from '@/features/main/components/why-us-section/why-us';
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

      <Button variant="outline" icon={<ArrowUpRight />}>
        Explore More
      </Button>
      <Button variant="ghost" icon={<ArrowUpRight />}>
        Get Started
      </Button>
      <Link to={`/${locale}/profile`}>Profile</Link>
      <WhyUs />
    </div>
  );
};

export default Home;
