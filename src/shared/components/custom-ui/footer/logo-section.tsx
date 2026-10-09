import React from 'react';
import Favicon from '/favicon.svg';

const LogoComponent: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <img src={Favicon} alt="Super Fitness" className="h-auto w-22" />
      <p className="max-w-60 leading-8 text-text-plain">
        Push harder, go further. Your fitness journey starts today!
      </p>
    </div>
  );
};

export default LogoComponent;
