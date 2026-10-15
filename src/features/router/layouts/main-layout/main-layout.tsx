import { Outlet, useMatch } from 'react-router-dom';
import AiChat from '@/features/main/shared/ai-chat';
import Header from '@/features/main/components/header';
import Footer from '@/shared/components/custom-ui/footer/footer';
const MainLayout = () => {
  const page = useMatch('/:locale/:page/*')?.params.page;
  const hideFooter = page === 'profile';
  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      {/* header */}

      <Header />

      {/* content */}
      <div className=" flex-1 w-full">
        <Outlet />
        {!hideFooter && <AiChat />}
      </div>
      {/* footer */}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
