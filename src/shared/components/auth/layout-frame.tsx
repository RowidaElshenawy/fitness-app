import React from 'react';
import Favicon from '/icons/favicon.svg';
import AuthLogo from '/images/auth-logo.png';

const LayoutComponent: React.FC = () => {
  return (
    <div className="relative  w-full overflow-hidden flex flex-col items-center  px-8">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center  gap-20">
        <img src={Favicon} alt="Super Fitness" className="w-55 h-auto" />
        <img src={AuthLogo} alt="Fitness character" className="h-auto " />
      </div>
    </div>
  );
};
export default LayoutComponent;
