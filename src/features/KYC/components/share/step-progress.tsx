import React from 'react';
import { useTranslation } from 'react-i18next';

export const StepProgress: React.FC = () => {
  const { t } = useTranslation();

  const currentStep = 1;
  const totalSteps = 6;
  const size = 64;
  const strokeWidth = 3;

  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const progress = currentStep / totalSteps;
  const strokeDashoffset = circumference - progress * circumference;

  const stepsText = t('kyc.stepProgress', {
    defaultValue: `${currentStep}/${totalSteps}`,
    current: currentStep,
    total: totalSteps,
  });

  return (
    <div
      className="relative flex items-center justify-center font-sans select-none"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke=""
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#FF4500"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />
      </svg>

      <span className="absolute text-white font-medium text-sm">{stepsText}</span>
    </div>
  );
};
