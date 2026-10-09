import React from 'react';
import LogoComponent from './logo-section';
import ContactComponent from './contact-section';
import TimeComponent from './time-section';
import LocationComponent from './location-section';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-muted py-10 w-full mb-0 flex bottom-0">
      <div className="mx-15 flex justify-between items-center w-full">
        <LogoComponent />
        <ContactComponent />
        <TimeComponent />
        <LocationComponent />
      </div>
    </footer>
  );
};

export default Footer;
