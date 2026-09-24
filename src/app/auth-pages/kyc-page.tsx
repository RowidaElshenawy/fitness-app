import { useState } from 'react';

import { GenderStep } from '@/features/KYC/components/gender-step';
import NumberPicker from '@/features/KYC/components/share/number-picker';
import { StepProgress } from '@/features/KYC/components/share/step-progress';
import { Button } from '@/shared/components/ui/button';

export interface KycFormData {
  gender: 'male' | 'female' | null;
  age: number;
  weight: number;
  height: number;
  goal: string;
  activityLevel: string;
}

export default function KycPage() {
  // Current step
  const [currentStep, setCurrentStep] = useState(1);

  // Total steps
  const totalSteps = 6;

  const [formData, setFormData] = useState<KycFormData>({
    gender: null,
    age: 25,
    weight: 70,
    height: 170,
    goal: '',
    activityLevel: '',
  });

  const updateFormData = <K extends keyof KycFormData>(key: K, value: KycFormData[K]) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    console.log('KYC DATA:', formData);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#111111] p-6 text-white md:flex-row">
      {/* ================================= */}
      {/* LEFT SIDE */}
      {/* ================================= */}

      <div
        className="
          flex
          w-full
          flex-col
          items-center
          justify-center
          border-b
          border-gray-800
          p-8
          md:w-1/2
          md:border-b-0
          md:border-r
        "
      >
        <img src="/assets/logo.png" alt="Super Fitness" className="mb-6 h-12" />

        <img
          src="/assets/fitness-man.png"
          alt="Fitness Person"
          className="max-h-[450px] object-contain"
        />
      </div>

      {/* ================================= */}
      {/* RIGHT SIDE */}
      {/* ================================= */}

      <div
        className="
          flex
          w-full
          flex-col
          items-center
          justify-center
          space-y-6
          p-8
          md:w-1/2
        "
      >
        {/* Progress */}
        <StepProgress currentStep={currentStep} totalSteps={totalSteps} />

        {/* STEP 1 - GENDER */}

        {currentStep === 1 && (
          <div className="flex w-full max-w-md flex-col items-center space-y-6">
            <h2 className="text-center text-2xl font-bold uppercase">Tell Us About Yourself!</h2>

            <p className="text-center text-sm text-gray-400">To Know About Your Gender</p>

            <GenderStep
              gender={formData.gender}
              onSelectGender={(selected) => updateFormData('gender', selected)}
            />

            <Button
              variant="primary"
              disabled={!formData.gender}
              onClick={handleNext}
              className="
                w-full
                py-4
                font-bold
                transition
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Next
            </Button>
          </div>
        )}

        {/* ================================= */}
        {/* STEP 2 - AGE */}
        {/* ================================= */}

        {currentStep === 2 && (
          <div className="flex w-full max-w-md flex-col items-center space-y-6">
            <h2 className="text-center text-2xl font-bold">How Old Are You?</h2>

            <NumberPicker
              title="Years Old"
              min={18}
              max={100}
              value={formData.age}
              onChange={(value) => updateFormData('age', value)}
            />

            <Button
              variant="primary"
              disabled={!formData.gender}
              onClick={handleNext}
              className="
                w-4/5
                py-6
                font-bold
                transition
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Next
            </Button>
          </div>
        )}

        {/* ================================= */}
        {/* STEP 3 - WEIGHT */}
        {/* ================================= */}

        {currentStep === 3 && (
          <div className="flex w-full max-w-md flex-col items-center space-y-6">
            <h2 className="text-center text-2xl font-bold">What Is Your Weight?</h2>

            <NumberPicker
              title="KG"
              min={30}
              max={200}
              value={formData.weight}
              onChange={(value) => updateFormData('weight', value)}
            />

            <Button
              variant="primary"
              disabled={!formData.gender}
              onClick={handleNext}
              className="
                  w-4/5
                py-6
                font-bold
                transition
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Next
            </Button>
          </div>
        )}

        {/* ================================= */}
        {/* STEP 4 - HEIGHT */}
        {/* ================================= */}

        {currentStep === 4 && (
          <div className="flex w-full max-w-md flex-col items-center space-y-6">
            <h2 className="text-center text-2xl font-bold">What Is Your Height?</h2>

            <NumberPicker
              title="CM"
              min={100}
              max={220}
              value={formData.height}
              onChange={(value) => updateFormData('height', value)}
            />

            <Button
              variant="primary"
              onClick={handleNext}
              className="
                     w-4/5
                py-6
                  
                
                  
                  font-bold
                "
            >
              Next
            </Button>
          </div>
        )}

        {/* ================================= */}
        {/* STEP 5 - GOAL */}
        {/* ================================= */}

        {currentStep === 5 && (
          <div className="flex w-full max-w-md flex-col items-center space-y-6">
            <h2 className="text-center text-2xl font-bold">What Is Your Goal?</h2>

            {/* 
             Goal Component
             
            */}

            <Button
              variant="primary"
              onClick={handleNext}
              className="
                      w-4/5
                py-6
                  font-bold
                "
            >
              Next
            </Button>
          </div>
        )}

        {/* ================================= */}
        {/* STEP 6 - ACTIVITY */}
        {/* ================================= */}

        {currentStep === 6 && (
          <div className="flex w-full max-w-md flex-col items-center space-y-6">
            <h2 className="text-center text-2xl font-bold">
              Your Regular Physical Activity Level?
            </h2>

            {/* 
             Physical Activity Level
            */}

            <Button
              variant="primary"
              onClick={handleNext}
              className="
                     w-4/5
                     py-6
                  font-bold
                "
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
