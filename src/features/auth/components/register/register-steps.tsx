//  import { isAxiosError } from 'axios';
// import { GenderStep } from "@/features/KYC/components/gender-step";
// import type { TRegisterFields, TRegisterStepsProps, TUserInfoData } from "../../types/register";
// import UserInfoForm from "./user-info-form";
// import { useState } from 'react';
// import { registerUser } from '../../lib/apis/register.api';

// export default function RegisterSteps() {
//   const [step, setStep] = useState<TRegisterStepsProps>('user-info');
//   const [userInfo, setUserInfo] = useState<TUserInfoData | null>(null);
//   const [gender, setGender] = useState<string>('');
//   const [age, setAge] = useState<Number>();
//   const [height, setHeight] = useState<Number>();
//   const [weight, setWeight] = useState<Number>();
//   const [goal, setGoal] = useState<string>('');
//   const [activityLevel, setActivityLevel] = useState<string>('');
// const [serverError, setServerError] = useState<string | null>(null);

// const onSubmit = async (data: TRegisterFields): Promise<void> => {
//   setServerError(null);
//   try {
//     await registerUser(data);
//     Navigate('/login');
//   } catch (err) {
//     if (isAxiosError<{ message?: string; error?: string }>(err)) {
//       if (err.response) {
//         setServerError(
//           err.response.data?.message ??
//             err.response.data?.error ??
//             `Signup failed (${err.response.status})`,
//         );
//       } else {
//         setServerError('Cannot reach the server. Check your connection.');
//       }
//     } else {
//       setServerError('Something went wrong');
//     }
//   }
// };
//   return (
//     <>
//       {step === 'user-info' ? (
//         <UserInfoForm setUserInfo={setUserInfo} setStep={setStep}  />
//      ) : step === 'gender' ? (
//         <GenderStep

//         />
//       ) : null}
//     </>

//   );
// }
