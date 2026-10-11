import { useTranslation } from 'react-i18next';

type StepProgressProps = {
  currentStep: number;
  totalSteps: number;
};

export const StepProgress = ({ currentStep, totalSteps }: StepProgressProps) => {
  const { t } = useTranslation();
  const size = 64;
  const strokeWidth = 3;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const progress = currentStep / totalSteps;
  const stepsText = t('auth.kyc.stepProgress', {
    defaultValue: `${currentStep}/${totalSteps}`,
    current: currentStep,
    total: totalSteps,
  });

  return (
    <div
      className="relative flex select-none items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90 transform" aria-hidden="true">
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="stroke-white/20"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress * circumference}
          strokeLinecap="round"
          className="stroke-bg-primary transition-all duration-500 ease-out"
        />
      </svg>
      <span className="absolute text-sm font-medium text-text-inverse">{stepsText}</span>
    </div>
  );
};
