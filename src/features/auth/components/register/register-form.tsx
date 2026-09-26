// 'use client';

// import { useMemo, useState } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import { useTranslation } from 'react-i18next';
// import { useRouter } from 'next/navigation';
// import { zodResolver } from '@hookform/resolvers/zod';

// import CustomInput from '@/shared/components/custom-ui/custom-input';
// import { FieldGroup, Field, FieldError } from '@/shared/components/ui/field';

// import LoginRegisterDesign from '../shared/login-register-design';
// import { REGISTER_SCHEMA } from '../../schemas/register.schema';
// import type { TRegisterData, TUserInfoData, TUserInfoProps } from '../../types/register';

// const SIGNUP_ENDPOINT = 'https://fitness.elevateegy.com/api/v1/auth/signup';

// async function registerRequest(payload: TRegisterData) {
//   const res = await fetch(SIGNUP_ENDPOINT, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });

//   const data = await res.json().catch(() => null);

//   if (!res.ok) {
//     throw new Error(data?.message ?? 'Something went wrong, please try again.');
//   }

//   return data;
// }

// export default function UserInfoForm({ setUserInfo, setStep, verifyError }:TUserInfoProps) {

//   const { t } = useTranslation();

//   const router = useRouter();
//   const SCHEMA = useMemo(() => REGISTER_SCHEMA(t), [t]);

//   const [serverError, setServerError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//  const userInfoMutation = useRegisterUserInfo();
//   const form = useForm<TUserInfoData>({
//     mode: 'onChange',
//     defaultValues: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       rePassword: '',
//     },
//     resolver: zodResolver(SCHEMA),
//   });

//    const onSubmit = async (data: TUserInfoData) => {
//     setIsLoading(true);
//     try {
//       const res = await useRegisterUserInfo.mutateAsync(data);
//       if (res?.status) {
//         setUserInfo(data);
//         setStep('about-you');
//       }
//     } catch (err) {
//       type ApiErrorLike = {
//         message?: string;
//         response?: { message?: string };
//       };

//       const apiMessage =
//         err instanceof Error
//           ? err.message
//           : ((err as ApiErrorLike)?.message ?? (err as ApiErrorLike)?.response?.message) || '';

//       const normalizedMessage = apiMessage.toLowerCase();

//       if (normalizedMessage.includes('no account')) {
//         setError('email', {
//           message: 'step1.errors.no-account',
//         });
//       } else if (normalizedMessage.includes('registered')) {
//         setError('email', {
//           message: 'step1.errors.email-already-registered',
//         });
//       } else {
//         setError('email', {
//           message: 'step1.errors.something-went-wrong',
//         });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <LoginRegisterDesign
//       buttonTitle="Register"
//       spanTitle="Already Have an account ?"
//       linkTitle="Login" // was "Register" in your original — likely a copy-paste, should probably say "Login"
//       href="/:locale/login"
//       form={form}
//       onSubmit={onSubmit}
//       isSubmitting={isSubmitting}
//     >
//       {serverError && (
//         <p role="alert" className="text-sm text-red-500">
//           {serverError}
//         </p>
//       )}

//       <FieldGroup>
//         <Controller
//           name="firstName"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field className="w-full" data-invalid={fieldState.invalid}>
//               <CustomInput
//                 {...field}
//                 id="firstName"
//                 autoComplete="given-name"
//                 variant="default"
//                 subVariant="first-name"
//                 errorMessage={fieldState.error?.message}
//               />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />

//         <Controller
//           name="lastName"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field className="w-full" data-invalid={fieldState.invalid}>
//               <CustomInput
//                 {...field}
//                 id="lastName"
//                 autoComplete="family-name"
//                 variant="default"
//                 subVariant="last-name"
//                 errorMessage={fieldState.error?.message}
//               />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />

//         <Controller
//           name="email"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field className="w-full" data-invalid={fieldState.invalid}>
//               <CustomInput
//                 {...field}
//                 id="email"
//                 autoComplete="email"
//                 variant="email"
//                 errorMessage={fieldState.error?.message}
//               />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />

//         <Controller
//           name="password"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <CustomInput
//                 {...field}
//                 id="password"
//                 autoComplete="new-password"
//                 variant="password"
//                 subVariant="password"
//                 errorMessage={fieldState.error?.message}
//               />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />

//         <Controller
//           name="rePassword"
//           control={form.control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <CustomInput
//                 {...field}
//                 id="rePassword"
//                 autoComplete="new-password"
//                 variant="password"
//                 subVariant="password"
//                 errorMessage={fieldState.error?.message}
//               />
//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />
//       </FieldGroup>
//     </LoginRegisterDesign>
//   );
// }
