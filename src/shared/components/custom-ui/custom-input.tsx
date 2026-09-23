'use client';
import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { Field } from '@base-ui/react/field';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import OTPVariant from '../ui/otp-variant';
import { useTranslation } from 'react-i18next';
import ErrorAlert from './error-alert';
import { Eye, EyeOff, Search, X, User, Mail, Lock } from 'lucide-react';
import { PhoneVariant } from '../ui/phone-variant.';

export type TInputValue = string | number | null;
export type TInputVariant = 'default' | 'search' | 'password' | 'otp' | 'phone' | 'email';

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
}: Omit<React.ComponentProps<'input'>, 'onChange'> & InputProps) {
  // determine language
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'custom-input' });
  const computedIsRtl = isRtl !== undefined ? isRtl : i18n.language?.startsWith('ar');

  // first & last name
  if (variant === 'default') {
    if (subVariant) {
      placeholder = t(`default.${subVariant}`);
    }
    // password
  } else if (variant === 'password') {
    if (subVariant) {
      placeholder = t(`password.${subVariant}`);
    } else {
      placeholder = t(`${variant}`);
    }
  }
  // search & email
  if (variant === 'email' || variant === 'search') {
    placeholder = t(`${variant}`);
  }

  // disabled and error states based on props and variant
  const isDisabled = disabled;
  const isError = !!errorMessage || error;

  // Which leading icon (if any) this variant/subVariant should show, resolved as a
  // plain identifier (not a capitalized "component" variable) to avoid rendering
  // a dynamically-created component during render.
  const leadingIconKind: 'search' | 'email' | 'password' | 'name' | null =
    variant === 'search'
      ? 'search'
      : variant === 'email'
        ? 'email'
        : variant === 'password'
          ? 'password'
          : variant === 'default' && (subVariant === 'first-name' || subVariant === 'last-name')
            ? 'name'
            : null; // phone/otp render their own internals, no leading icon here

  const leadingIconClassName = cn(
    'absolute h-4 w-4 text-text-muted pointer-events-none top-1/2 -translate-y-1/2 z-10',
    computedIsRtl ? 'right-3' : 'left-3'
  );

  // Local states for managing input behavior
  const [showPassword, setShowPassword] = React.useState(false);
  const [hasSearchValue, setHasSearchValue] = React.useState<boolean>(!!defaultValue);
  const [resetKey, setResetKey] = React.useState<number>(0);
  const internalRef = React.useRef<HTMLInputElement | null>(null);

  // Handle input changes for number and search variants
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target) return;
    const val = e.target.value || '';

    if (variant === 'search') {
      setHasSearchValue(val.length > 0);
    }

    // Forward the original event natively to parent listeners
    (onChange as React.ChangeEventHandler<HTMLInputElement>)?.(e);
  };

  // Handle input changes for OTP variant
  const handleOtpStringChange = (value: string) => {
    const syntheticEvent = {
      target: { value, name: props.name || id, id },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    (onChange as React.ChangeEventHandler<HTMLInputElement>)?.(syntheticEvent);
  };

  // Determine the input type
  const getInputType = () => {
    if (variant === 'password') return showPassword ? 'text' : 'password';
    if (variant === 'search') return 'search';
    if (variant === 'email') return 'email';
    return 'text';
  };

  // Handle clearing search input
  const handleClearSearch = () => {
    if (isDisabled) return;
    setHasSearchValue(false);
    setResetKey((prev) => prev + 1);

    setTimeout(() => {
      if (internalRef.current) {
        internalRef.current.value = '';
        const event = new Event('input', { bubbles: true });
        internalRef.current.dispatchEvent(event);
        const syntheticEvent = {
          target: { value: '', name: props.name || id, id },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        (onChange as React.ChangeEventHandler<HTMLInputElement>)?.(syntheticEvent);
      }
    }, 0);
  };

  // Handle toggling password visibility, preserving cursor position/selection
  const toggleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const start = internalRef.current?.selectionStart ?? null;
    const end = internalRef.current?.selectionEnd ?? null;

    setShowPassword((prev) => !prev);

    requestAnimationFrame(() => {
      if (internalRef.current && start !== null && end !== null) {
        internalRef.current.focus();
        internalRef.current.setSelectionRange(start, end);
      }
    });
  };

  // Input styles Definitions
  const normalInputStyle = `
   rounded-lg
  text-text-subtle 
    border-border-soft
      hover:border-border-default
      placeholder:text-text-subtle
   focus-visible:border-border-primary  
  `;
  const errorInputStyle = ` 
    border-border-danger 
     rounded-lg
    text-text-danger 
      placeholder:text-text-subtle
  `;
  const disableInputStyle = `
    border-border-muted
    border rounded-lg
     bg-bg-muted text-text-muted 
     placeholder:text-text-subtle
    pointer-events-none cursor-not-allowed
  `;

  const inputStyle = isDisabled ? disableInputStyle : isError ? errorInputStyle : normalInputStyle;

  return (
    <Field.Root
      className={cn('items-start justify-start flex-col gap-2  m-w-375 ', className)}
      dir={computedIsRtl ? 'rtl' : 'ltr'}
    >
      <div className="relative flex items-center w-full isolate">
        {/* Render the leading icon (search / email / password / firstName / lastName) */}
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

        {/* Render the default, search, password and email variants */}
        {variant !== 'phone' && variant !== 'otp' && (
          <InputPrimitive
            key={resetKey}
            ref={internalRef}
            type={getInputType()}
            id={id}
            disabled={isDisabled}
            defaultValue={defaultValue as string | number | undefined}
            onChange={handleChange}
            autoComplete="off"
            placeholder={placeholder}
            data-slot="input"
            className={cn(
              'h-11.5 text-start  w-full  border px-4 py-2 text-base transition-colors outline-none md:text-sm ',
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

        {/* Render the Phone input variant */}
        {variant === 'phone' && (
          <PhoneVariant
            isError={isError}
            isDisabled={isDisabled}
            className={`  focus-visible:outline-none
               focus-visible:ring-0h-9 w-full min-w-0 
               rounded-lg border px-4 py-2
                text-base transition-colors outline-none
                 md:text-sm
                ${inputStyle} `}
            placeholder={placeholder}
            value={props.value as string}
            onChange={(val) => {
              const syntheticEvent = {
                target: { value: val || '', name: props.name || id, id },
              } as unknown as React.ChangeEvent<HTMLInputElement>;
              onChange?.(syntheticEvent);
            }}
            onBlur={props.onBlur}
          />
        )}

        {/* Render the Otp input variant */}
        {variant === 'otp' && (
          <OTPVariant
            isError={isError}
            isDisabled={isDisabled}
            defaultValue={defaultValue as string}
            onChange={handleOtpStringChange}
          />
        )}

        {/* Render the search clear button */}
        {variant === 'search' && hasSearchValue && !isError && (
          <button
            type="button"
            onClick={handleClearSearch}
            disabled={isDisabled}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 text-text-muted hover:text-text-plain    transition-colors z-10',
              computedIsRtl ? 'left-2.5' : 'right-2.5'
            )}
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Render the password visibility toggle button */}
        {variant === 'password' && !isError && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={toggleShowPassword}
            disabled={isDisabled}
            aria-label={
              showPassword ? t('hidePassword', 'Hide password') : t('showPassword', 'Show password')
            }
            className={cn(
              'absolute top-1/2 -translate-y-1/2 text-text-muted hover:text-text-plain  transition-colors z-30 pointer-events-auto block select-none',
              computedIsRtl ? 'left-3' : 'right-3'
            )}
            style={{ contentVisibility: 'auto' }}
          >
            {showPassword ? (
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
