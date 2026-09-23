'use client';

import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { Field } from '@base-ui/react/field';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Search, X, User, Mail, Lock } from 'lucide-react';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import OTPVariant from '../ui/otp-variant';
import { PhoneVariant } from '../ui/phone-variant.';
import ErrorAlert from './error-alert';

export type TInputValue = string | number | null;
export type TInputVariant = 'default' | 'search' | 'password' | 'otp' | 'phone' | 'email';

type TLeadingIconKind = 'search' | 'email' | 'password' | 'name' | null;

interface InputProps {
  variant: TInputVariant;
  subVariant?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  isRtl?: boolean;
  className?: string;
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

type CustomInputProps = Omit<React.ComponentProps<'input'>, 'onChange'> & InputProps;

// Static style variants
const NORMAL_INPUT_STYLE = `
  rounded-lg
  text-text-subtle
  border-border-soft
  hover:border-border-default
  placeholder:text-text-subtle
  focus-visible:border-border-primary
`;

const ERROR_INPUT_STYLE = `
  rounded-lg
  border-border-danger
  text-text-danger
  placeholder:text-text-subtle
`;

const DISABLED_INPUT_STYLE = `
  border
  rounded-lg
  border-border-muted
  bg-bg-muted
  text-text-muted
  placeholder:text-text-subtle
  pointer-events-none
  cursor-not-allowed
`;

// Resolves the leading icon kind for a variant/subVariant
function resolveLeadingIconKind(variant: TInputVariant, subVariant?: string): TLeadingIconKind {
  if (variant === 'search') return 'search';
  if (variant === 'email') return 'email';
  if (variant === 'password') return 'password';
  if (variant === 'default' && (subVariant === 'first-name' || subVariant === 'last-name')) {
    return 'name';
  }
  return null;
}

// Translate default placeholder .
function resolveDefaultPlaceholder(
  variant: TInputVariant,
  subVariant: string | undefined,
  t: (key: string) => string
): string | undefined {
  if (variant === 'default') {
    return subVariant ? t(`default.${subVariant}`) : undefined;
  }
  if (variant === 'password') {
    return subVariant ? t(`password.${subVariant}`) : t('password');
  }
  if (variant === 'email' || variant === 'search') {
    return t(variant);
  }
  return undefined;
}

function resolveInputType(variant: TInputVariant, isPasswordVisible: boolean) {
  if (variant === 'password') return isPasswordVisible ? 'text' : 'password';
  if (variant === 'search') return 'search';
  if (variant === 'email') return 'email';
  return 'text';
}

export default function CustomInput({
  variant,
  subVariant,
  errorMessage,
  isRtl,
  placeholder,
  disabled = false,
  error = false,
  className = '',
  id,
  onChange,
  defaultValue,
  ...props
}: CustomInputProps) {
  // Translation
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'custom-input' });

  // State
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [hasSearchValue, setHasSearchValue] = React.useState<boolean>(!!defaultValue);
  const [resetKey, setResetKey] = React.useState<number>(0);

  // Ref
  const internalRef = React.useRef<HTMLInputElement | null>(null);

  // Variables (derived)
  const computedIsRtl = isRtl ?? i18n.language?.startsWith('ar');
  const isDisabled = disabled;
  const isError = !!errorMessage || error;
  const resolvedPlaceholder = placeholder ?? resolveDefaultPlaceholder(variant, subVariant, t);
  const leadingIconKind = resolveLeadingIconKind(variant, subVariant);
  const leadingIconClassName = cn(
    'absolute h-4 w-4 text-text-muted pointer-events-none top-1/2 -translate-y-1/2 z-10',
    computedIsRtl ? 'right-3' : 'left-3'
  );
  const inputStyle = isDisabled
    ? DISABLED_INPUT_STYLE
    : isError
      ? ERROR_INPUT_STYLE
      : NORMAL_INPUT_STYLE;

  // Functions (handlers)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (variant === 'search') {
      setHasSearchValue((e.target.value || '').length > 0);
    }
    onChange?.(e);
  };

  const handleOtpChange = (value: string) => {
    emitChange(value);
  };

  const handlePhoneChange = (value: string | undefined) => {
    emitChange(value || '');
  };

  const emitChange = (value: string) => {
    const syntheticEvent = {
      target: { value, name: props.name || id, id },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange?.(syntheticEvent);
  };

  const handleClearSearch = () => {
    if (isDisabled) return;
    setHasSearchValue(false);
    setResetKey((prev) => prev + 1);
    resetInternalInputValue();
  };

  const resetInternalInputValue = () => {
    setTimeout(() => {
      const inputEl = internalRef.current;
      if (!inputEl) return;

      inputEl.value = '';
      inputEl.dispatchEvent(new Event('input', { bubbles: true }));
      emitChange('');
    }, 0);
  };

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const start = internalRef.current?.selectionStart ?? null;
    const end = internalRef.current?.selectionEnd ?? null;

    setIsPasswordVisible((prev) => !prev);

    requestAnimationFrame(() => {
      if (internalRef.current && start !== null && end !== null) {
        internalRef.current.focus();
        internalRef.current.setSelectionRange(start, end);
      }
    });
  };

  return (
    <Field.Root
      className={cn('items-start justify-start flex-col gap-2 m-w-375', className)}
      dir={computedIsRtl ? 'rtl' : 'ltr'}
    >
      <div className="relative flex items-center w-full isolate">
        {/* Leading icon (search / email / password / firstName / lastName) */}
        {!isError && leadingIconKind === 'search' && (
          <Search className={leadingIconClassName} aria-hidden="true" strokeWidth={2} />
        )}
        {!isError && leadingIconKind === 'email' && (
          <Mail className={leadingIconClassName} aria-hidden="true" strokeWidth={2} />
        )}
        {!isError && leadingIconKind === 'password' && (
          <Lock className={leadingIconClassName} aria-hidden="true" strokeWidth={2} />
        )}
        {!isError && leadingIconKind === 'name' && (
          <User className={leadingIconClassName} aria-hidden="true" strokeWidth={2} />
        )}

        {/* Default, search, password and email variants */}
        {variant !== 'phone' && variant !== 'otp' && (
          <InputPrimitive
            key={resetKey}
            ref={internalRef}
            type={resolveInputType(variant, isPasswordVisible)}
            id={id}
            disabled={isDisabled}
            defaultValue={defaultValue as string | number | undefined}
            onChange={handleChange}
            autoComplete="off"
            placeholder={resolvedPlaceholder}
            data-slot="input"
            aria-invalid={isError || undefined}
            aria-describedby={isError && id ? `${id}-error` : undefined}
            className={cn(
              'h-11.5 text-start w-full border px-4 py-2 text-base transition-colors outline-none md:text-sm',
              'focus-visible:outline-none focus-visible:ring-0',
              leadingIconKind && 'ps-9',
              variant === 'search' && 'pe-3',
              variant === 'password' && 'pe-9',
              !leadingIconKind && variant !== 'password' && 'px-3',
              '[&::-webkit-search-decoration]:appearance-none [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none',
              inputStyle
            )}
            {...(props as React.ComponentProps<'input'>)}
          />
        )}

        {/* Phone variant */}
        {variant === 'phone' && (
          <PhoneVariant
            isError={isError}
            isDisabled={isDisabled}
            className={cn(
              'focus-visible:outline-none focus-visible:ring-0 h-9 w-full min-w-0 rounded-lg border px-4 py-2 text-base transition-colors outline-none md:text-sm',
              inputStyle
            )}
            placeholder={resolvedPlaceholder}
            value={props.value as string}
            onChange={handlePhoneChange}
            onBlur={props.onBlur}
          />
        )}

        {/* OTP variant */}
        {variant === 'otp' && (
          <OTPVariant
            isError={isError}
            isDisabled={isDisabled}
            defaultValue={defaultValue as string}
            onChange={handleOtpChange}
          />
        )}

        {/* Search clear button */}
        {variant === 'search' && hasSearchValue && !isError && (
          <button
            type="button"
            onClick={handleClearSearch}
            disabled={isDisabled}
            aria-label={t('clearSearch', 'Clear search')}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 text-text-muted hover:text-text-plain transition-colors z-10',
              computedIsRtl ? 'left-2.5' : 'right-2.5'
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Password visibility toggle */}
        {variant === 'password' && !isError && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={togglePasswordVisibility}
            disabled={isDisabled}
            aria-label={
              isPasswordVisible
                ? t('hidePassword', 'Hide password')
                : t('showPassword', 'Show password')
            }
            className={cn(
              'absolute top-1/2 -translate-y-1/2 text-text-muted hover:text-text-plain transition-colors z-30 pointer-events-auto block select-none',
              computedIsRtl ? 'left-3' : 'right-3'
            )}
            style={{ contentVisibility: 'auto' }}
          >
            {isPasswordVisible ? (
              <EyeOff size={16} className="pointer-events-none" />
            ) : (
              <Eye size={16} className="pointer-events-none" />
            )}
          </button>
        )}
      </div>

      {errorMessage && <ErrorAlert errorMessage={errorMessage} isRtl={computedIsRtl} />}
    </Field.Root>
  );
}
