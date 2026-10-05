import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ActivityStep } from './steps/activity-step';
import { GenderStep } from './steps/gender-step';
import { GoalStep } from './steps/goal-step';
import NumberPicker from './steps/number-picker';
import { StepProgress } from './steps/step-progress';
import ErrorAlert from '@/shared/components/custom-ui/error-alert';
import { Button } from '@/shared/components/ui/button';
import HeaderAuth from '../shared/header-auth';
import type { KycFormData, TRegisterStepsProps, TUserInfoData } from '../../types/register';
import { registerUser } from '../../lib/apis/register.api';
import UserInfoForm from './user-info-form';
import { useMutation } from '@tanstack/react-query';

const PROFILE_STEPS: Exclude<TRegisterStepsProps, 'user-info'>[] = [
  'gender',
  'age',
  'weight',
  'height',
  'goal',
  'activityLevel',
];

export default function RegisterSteps() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { locale = 'en' } = useParams();
  const [step, setStep] = useState<TRegisterStepsProps>('user-info');
  const [userInfo, setUserInfo] = useState<TUserInfoData | null>(null);
  const [formData, setFormData] = useState<KycFormData>({
    gender: null,
    age: 25,
    weight: 70,
    height: 170,
    goal: '',
    activityLevel: '',
  });
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate(`/${locale}/login`, { replace: true });
    },
    onError: (error) => {
      console.error(isAxiosError(error) ? [error.response?.status, error.response?.data] : error);
    },
  });

  const registerError = isAxiosError(registerMutation.error)
    ? String(
        registerMutation.error.response?.data?.message ??
          registerMutation.error.response?.data?.error ??
          registerMutation.error.message
      )
    : registerMutation.error
      ? 'Something went wrong. Please try again.'
      : '';

  const updateFormData = <K extends keyof KycFormData>(key: K, value: KycFormData[K]) => {
    setFormData((previous) => ({ ...previous, [key]: value }));
  };

  const currentProfileStep = PROFILE_STEPS.indexOf(
    step as Exclude<TRegisterStepsProps, 'user-info'>
  );
  const handleNext = () => {
    if (currentProfileStep < PROFILE_STEPS.length - 1) {
      setStep(PROFILE_STEPS[currentProfileStep + 1]);
      return;
    }

    if (!userInfo || !formData.gender || !formData.goal || !formData.activityLevel) {
      return;
    }

    registerMutation.mutate({
      ...userInfo,
      gender: formData.gender,
      age: formData.age,
      weight: formData.weight,
      height: formData.height,
      goal: formData.goal,
      activityLevel: formData.activityLevel,
    });
  };

  const handleBack = () => {
    if (currentProfileStep === 0) {
      setStep('user-info');
      return;
    }
    setStep(PROFILE_STEPS[currentProfileStep - 1]);
  };

  if (step === 'user-info') {
    return <UserInfoForm setUserInfo={setUserInfo} setStep={setStep} />;
  }

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-6 px-6 text-text-inverse">
      <StepProgress currentStep={currentProfileStep + 2} totalSteps={PROFILE_STEPS.length + 1} />
      {step === 'gender' && (
        <>
          <HeaderAuth
            title={t('auth.kyc.gender-title')}
            subtitle={t('auth.kyc.gender-subtitle')}
            subtitlePosition="after"
          />
          <GenderStep
            gender={formData.gender}
            onSelectGender={(gender) => updateFormData('gender', gender)}
          />
        </>
      )}
      {step === 'age' && (
        <>
          <HeaderAuth
            title={t('auth.kyc.age-title')}
            subtitle={t('auth.kyc.hint')}
            subtitlePosition="after"
          />
          <NumberPicker
            title={t('auth.kyc.units.years-old')}
            min={10}
            max={100}
            value={formData.age}
            onChange={(value) => updateFormData('age', value)}
          />
        </>
      )}
      {step === 'weight' && (
        <>
          <HeaderAuth
            title={t('auth.kyc.weight-title')}
            subtitle={t('auth.kyc.hint')}
            subtitlePosition="after"
          />
          <NumberPicker
            title={t('auth.kyc.units.kg')}
            min={30}
            max={200}
            value={formData.weight}
            onChange={(value) => updateFormData('weight', value)}
          />
        </>
      )}
      {step === 'height' && (
        <>
          <HeaderAuth
            title={t('auth.kyc.height-title')}
            subtitle={t('auth.kyc.hint')}
            subtitlePosition="after"
          />
          <NumberPicker
            title={t('auth.kyc.units.cm')}
            min={100}
            max={220}
            value={formData.height}
            onChange={(value) => updateFormData('height', value)}
          />
        </>
      )}
      {step === 'goal' && (
        <>
          <HeaderAuth
            title={t('auth.kyc.goal-title')}
            subtitle={t('auth.kyc.hint')}
            subtitlePosition="after"
          />
          <GoalStep goal={formData.goal} onSelectGoal={(goal) => updateFormData('goal', goal)} />
        </>
      )}
      {step === 'activityLevel' && (
        <>
          <HeaderAuth
            title={t('auth.kyc.activity-title')}
            subtitle={t('auth.kyc.hint')}
            subtitlePosition="after"
          />
          <ActivityStep
            activityLevel={formData.activityLevel}
            onSelectActivityLevel={(activityLevel) =>
              updateFormData('activityLevel', activityLevel)
            }
          />
        </>
      )}

      {registerError && <ErrorAlert errorMessage={registerError} />}
      <div className="flex w-full gap-3">
        <Button type="button" variant="ghost" className="flex-1" onClick={handleBack}>
          {t('custom-input.default.back')}
        </Button>
        <Button
          type="button"
          variant={step === 'gender' ? (formData.gender ? 'primary' : 'ghost') : 'primary'}
          className="flex-1 py-6 text-lg font-bold"
          disabled={
            registerMutation.isPending ||
            (step === 'gender' && !formData.gender) ||
            (step === 'goal' && !formData.goal) ||
            (step === 'activityLevel' && !formData.activityLevel)
          }
          onClick={handleNext}
        >
          {registerMutation.isPending
            ? t('custom-input.default.submit')
            : t(
                step === 'activityLevel'
                  ? 'custom-input.default.submit'
                  : 'custom-input.default.next'
              )}
        </Button>
      </div>
    </div>
  );
}
