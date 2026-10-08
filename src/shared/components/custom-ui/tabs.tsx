import { useState } from 'react';

const categories = ['Full Body', 'Chest', 'Arm', 'Shoulder', 'Back', 'Legs', 'Stomach'];

export default function WorkoutTabs() {
  const [activeTab, setActiveTab] = useState('Full Body');

  return (
    <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveTab(category)}
          className={`
              whitespace-nowrap
              hover:cursor-pointer
              px-5 py-2
              rounded-full
              text-lg
              font-bold
              transition-all duration-300
              ${
                activeTab === category
                  ? 'bg-bg-primary text-white'
                  : 'bg-transparent text-black hover:text-text-primary hover:bg-bg-primary-fade'
              }
            `}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
