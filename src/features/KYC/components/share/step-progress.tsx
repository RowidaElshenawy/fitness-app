import React from 'react';
import { useTranslation } from 'react-i18next';

type StepProgressProps = {
  currentStep: number;
  totalSteps: number;
};

export const StepProgress: React.FC<StepProgressProps> = ({ currentStep, totalSteps }) => {
  const { t } = useTranslation();

  const size = 64;
  const strokeWidth = 3;

  const center = size / 2;
  const radius = center - strokeWidth;

  const circumference = 2 * Math.PI * radius;

  // Calculate progress
  const progress = currentStep / totalSteps;

  const strokeDashoffset = circumference - progress * circumference;

  const stepsText = t('kyc.stepProgress', {
    defaultValue: `${currentStep}/${totalSteps}`,
    current: currentStep,
    total: totalSteps,
  });

  return (
    <div
      className="relative flex select-none items-center justify-center font-sans"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size} className="-rotate-90 transform">
        {/* Background Circle */}
        <circle cx={center} cy={center} r={radius} strokeWidth={strokeWidth} fill="transparent" />

        {/* Progress Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out stroke-bg-primary"
        />
      </svg>

      {/* Step Number */}
      <span className="absolute text-sm font-medium text-text-inverse">{stepsText}</span>
    </div>
  );
};
