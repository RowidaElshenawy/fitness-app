import React from 'react';
import Favicon from '/icons/favicon.svg';
import AuthLogo from '/images/auth-logo.png';

const LayoutComponent: React.FC = () => {
  return (
    <section className="relative hidden flex-col items-center justify-center gap-10 px-8 py-16 lg:flex">
      <div className="relative  w-full overflow-hidden flex flex-col items-center  px-8">
        <div className="relative z-10 flex flex-col items-center  gap-20">
          <img src={Favicon} alt="Super Fitness" className="h-auto w-55" />
          <img src={AuthLogo} alt="Fitness character" className="h-auto w-full max-w-157" />
         </div>
      </div>
      {/* Divider: primary line with glow on both sides */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 inset-e-0 w-px bg-border-primary shadow-[0_0_14px_2px_color-mix(in_srgb,var(--border-primary)_55%,transparent)]"
      />
    </section>
  );
};

export default LayoutComponent;
