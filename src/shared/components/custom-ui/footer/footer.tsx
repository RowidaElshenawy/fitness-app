import React from 'react';
import LogoComponent from './logo-section';
import ContactComponent from './contact-section';
import TimeComponent from './time-section';
import LocationComponent from './location-section';
import MarqueeComponent from './marquee';

const Footer: React.FC = () => {
  return (
    <footer className="w-full overflow-hidden bg-bg-muted">
      <MarqueeComponent />

      <div className="flex w-full flex-col items-start gap-10 px-8 py-10 lg:flex-row lg:justify-between lg:px-13 md:flex-row md:justify-between md:px-13">
        <LogoComponent />
        <ContactComponent />
        <TimeComponent />
        <LocationComponent />
      </div>
    </footer>
  );
};

export default Footer;
