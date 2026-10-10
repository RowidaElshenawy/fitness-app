import { Button } from '@/shared/components/ui/button';
import { useState } from 'react';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);

    // محاكاة API request
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
  };

  return (
    <div>
      <Button type="submit" loading={isLoading} onClick={handleClick}>
        NEXT
      </Button>
    </div>
  );
};

export default Home;
