import React from 'react';

const LocationComponent: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-bold uppercase text-text-plain">Our Location</h3>

      <address className="max-w-64 leading-8 not-italic text-text-plain">
        2715 Ash Dr. San Jose, South Dakota 83475
      </address>
    </div>
  );
};

export default LocationComponent;
