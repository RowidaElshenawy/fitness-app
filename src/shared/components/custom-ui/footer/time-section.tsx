import React from 'react';

const TIMINGS = ['Mon - Fri : 08:00 AM - 10:00 PM', 'Sat - Sun : 08:00 AM - 09:00 PM'];

const TimeComponent: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg font-bold uppercase text-text-plain">Our Gym Timing</h3>

      <ul className="flex flex-col gap-3">
        {TIMINGS.map((time) => (
          <li key={time} className="text-text-plain">
            {time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeComponent;
