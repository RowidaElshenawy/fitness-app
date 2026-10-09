import React from 'react';
import LayoutBackground from '@/shared/components/auth/layout-background';
import LayoutComponent from '@/shared/components/auth/layout-frame';

interface AuthLayoutProps {
  children?: React.ReactNode; // or use <Outlet /> with React Router
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <LayoutBackground />

      <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left: logo + character */}
        <LayoutComponent />

        {/* Right: heading + glass card */}
        <section className="flex flex-col items-center justify-center px-6 py-16">
          <p className="text-xl text-foreground">Hey There</p>
          <h1 className="mb-10 mt-6 text-center text-4xl font-extrabold text-foreground">
            Create An Account
          </h1>

          <div className="w-full max-w-121 rounded-[64px] border border-foreground/40 px-10 py-10 backdrop-blur-sm sm:px-20">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuthLayout;
