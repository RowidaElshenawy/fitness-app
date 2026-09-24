import { Mars, Venus } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface GenderStepProps {
  gender: 'male' | 'female' | null;
  onSelectGender: (gender: 'male' | 'female') => void;
  onNext: () => void;
}

export const GenderStep: React.FC<GenderStepProps> = ({ gender, onSelectGender }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-md mx-auto text-white">
      {/* خيارات اختيار الجنس */}

      <div className="flex items-center justify-center gap-8 my-4">
        {/* خيار الذكر */}

        <button
          type="button"
          onClick={() => onSelectGender('male')}
          className={`group flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 transition-all duration-200 outline-none ${
            gender === 'male'
              ? 'border-[#FF4500] bg-[#FF4500]/10 text-white shadow-lg shadow-[#FF4500]/20'
              : 'border-gray-600 bg-transparent text-gray-400 hover:border-gray-400'
          }`}
        >
          {/* أيقونة الذكر */}
          <Mars />
          <span className="text-xs font-semibold">{t('kyc.male', 'Male')}</span>
        </button>

        {/* خيار الأنثى */}
        <button
          type="button"
          onClick={() => onSelectGender('female')}
          className={`group flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 transition-all duration-200 outline-none ${
            gender === 'female'
              ? 'border-[#FF4500] bg-[#FF4500]/10 text-white shadow-lg shadow-[#FF4500]/20'
              : 'border-gray-600 bg-transparent text-gray-400 hover:border-gray-400'
          }`}
        >
          {/* أيقونة الأنثى */}

          <Venus />
          <span className="text-xs font-semibold">{t('kyc.female', 'Female')}</span>
        </button>
      </div>
    </div>
  );
};
