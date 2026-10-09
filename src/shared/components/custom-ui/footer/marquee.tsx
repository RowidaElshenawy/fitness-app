import React from 'react';
import Star from '/icons/star.svg';

const ITEMS = [
  'Outdoor & Online Trainers',
  'Personal Training',
  'Live Classes',
  'Personal Trainers',
];

const REPEAT = 3;
const TRACK_ITEMS = Array.from({ length: REPEAT }, () => ITEMS).flat();

const MarqueeComponent: React.FC = () => {
  return (
    <section
      dir="ltr"
      aria-label="Our services"
      className="w-full overflow-hidden bg-bg-primary py-4 text-white"
    >
      <div className="flex w-max animate-marquee hover:paused motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {TRACK_ITEMS.map((item, i) => (
              <li
                key={`${item}-${i}`}
                className="flex items-center whitespace-nowrap text-lg font-bold uppercase"
              >
                <span>{item}</span>
                <img src={Star} alt="" className="mx-6 size-5" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
};

export default MarqueeComponent;
