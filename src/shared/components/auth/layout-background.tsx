import React from 'react';

const LayoutBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[url('/images/layout-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-bg-overlay backdrop-blur-[86px]" />
    </div>
  );
};

export default LayoutBackground;
