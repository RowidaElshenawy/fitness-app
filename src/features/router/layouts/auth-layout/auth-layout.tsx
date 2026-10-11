import LayoutBackground from '@/shared/components/auth/layout-background';
import LayoutComponent from '@/shared/components/auth/layout-frame';
import LanguageSwitcher from '@/shared/components/custom-ui/language-switcher/language-switcher';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <main>
      <div className="relative min-h-screen w-full overflow-hidden flex flex-col md:flex-row ">
        {/* Background blur overlay */}
        <LayoutBackground />

        {/* Left panel — branding */}
        <div className="relative z-10 w-full md:w-1/2 py-10">
          <LayoutComponent />

          {/* Right panel — auth form content */}
          <div className="relative z-10 flex flex-col  md:w-1/2 items-center justify-center px-6 py-12  border-l border-border-primary shadow-shadow-primary-lg">
            <LanguageSwitcher />
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
