import React from 'react';

const ProfileBackground: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 min-h-screen bg-[url('/images/layout-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-bg-overlay backdrop-blur-[86px]" />
    </div>
  );
};

export default ProfileBackground;
