import { Card, CardAction, CardImage, CardOverlay, CardTitle } from '@/shared/components/ui/card';

const Home = () => {
  return (
    <Card className="h-[320px] w-full max-w-[322px]">
      <CardImage
        src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601"
        alt="Pasta with chicken"
        className="h-full"
      />

      <CardOverlay>
        <div className="w-full">
          <CardTitle>PASTA WITH CHICKEN</CardTitle>

          <CardAction className="mt-8 ">Explore</CardAction>
        </div>
      </CardOverlay>
    </Card>
  );
};

export default Home;
