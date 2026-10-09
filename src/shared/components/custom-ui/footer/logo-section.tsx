import React from 'react';
import Favicon from '/icons/logo-sm.svg';

const LogoComponent: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <img src={Favicon} alt="Super Fitness" className="w-25 h-16" />
      <p className="max-w-60 leading-8 text-text-plain">
        Push harder, go further. Your fitness journey starts today!
      </p>
    </div>
  );
};

export default LogoComponent;
