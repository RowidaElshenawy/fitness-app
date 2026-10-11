import { Button } from '@/shared/components/ui/button';
import type { RootState } from '@/store/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

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
    </div>
  );
};

export default Home;
