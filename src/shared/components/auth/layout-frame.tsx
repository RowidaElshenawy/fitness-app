import React from 'react';
import Favicon from '/icons/favicon.svg';
import AuthLogo from '/images/auth-logo.png';

const LayoutComponent: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center py-32 px-8 max-h-180.25 ">
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center p-2">
        <img src={Favicon} alt="Super Fitness" className="w-55 h-auto" />
        <img src={AuthLogo} alt="Fitness character" className="w-157 h-auto" />
      </div>
    </div>
  );
};
export default LayoutComponent;
