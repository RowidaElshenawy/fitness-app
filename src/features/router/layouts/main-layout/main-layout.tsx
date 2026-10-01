import { Outlet } from 'react-router-dom';
import AiChat from '@/features/main/shared/ai-chat';
const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center ">
      {/* header */}
      <div className="h-10 w-full bg-amber-950 fixe"></div>
      {/* content */}
      <div className=" flex-1 w-full bg-amber-500">
        <Outlet />
        <AiChat />
      </div>
      {/* footer */}
      <div className="h-35 w-full bg-amber-950 "></div>
    </div>
  );
};

export default MainLayout;
