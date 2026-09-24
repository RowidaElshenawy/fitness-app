import { GenderStep } from '@/features/KYC/components/gender-step';
import NumberPicker from '@/features/KYC/components/share/number-picker';
import { StepProgress } from '@/features/KYC/components/share/step-progress';
import { useState } from 'react';

// يمكنك استيراد مكونات باقي الخطوات هنا:
// import { AgeStep } from './AgeStep';
// import { WeightStep } from './WeightStep';
// import { HeightStep } from './HeightStep';

export default function KycPage() {
  // 1. حالة الخطوة الحالية
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 6;
  const [age, setAge] = useState(20);
  // 2. حالة تجميع بيانات الفورم بالكامل
  const [formData, setFormData] = useState({
    gender: null as 'male' | 'female' | null,
    age: 25,
    weight: 90,
    height: 167,
  });

  // التنقل للخطوة التالية
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // إرسال البيانات النهائية
      console.log('Final Submitted Data:', formData);
    }
  };

  // العودة للخطوة السابقة
  // const handleBack = () => {
  //   if (currentStep > 1) {
  //     setCurrentStep((prev) => prev - 1);
  //   }
  // };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 p-8">
      <div className="flex flex-col items-center gap-8">
        <StepProgress />

        {/* <AgeStep
          
        /> */}
        <NumberPicker title="Years Old" min={18} max={100} value={age} onChange={setAge} />

        <GenderStep
          gender={formData.gender}
          onSelectGender={(selected) => setFormData((prev) => ({ ...prev, gender: selected }))}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
