import { Outlet } from 'react-router-dom';
import Footer from '@/shared/components/custom-ui/footer/footer';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
