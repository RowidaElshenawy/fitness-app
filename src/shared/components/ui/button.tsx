import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import type { ReactNode } from 'react';

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center rounded-full border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: 'bg-bg-primary text-text-inverse hover:bg-bg-primary/90',
        outline:
          'border border-border-primary bg-transparent text-text-primary hover:bg-bg-primary-fade',
        ghost: 'bg-bg-soft text-text-inverse rounded-full hover:bg-bg-default',
      },
      size: {
        default: 'h-10 px-6',
        xs: 'h-7 px-3 text-xs',
        sm: 'h-8 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'size-10',
        'icon-xs': 'size-7',
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
  };

function Button({
  className,
  variant = 'primary',
  size = 'default',
  icon,
  iconPosition = 'right',
  children,
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        // إضافة مساحة داخلية للنص حتى لا يلتصق بالأيقونة البارزة
        icon && iconPosition === 'right' && 'pr-7',
        icon && iconPosition === 'left' && 'pl-7'
      )}
      {...props}
    >
      {iconPosition === 'left' && icon && (
        <span
          className={cn(
            'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2',
            'flex size-8 items-center justify-center rounded-full',
            'bg-bg-primary text-text-inverse',

            'shadow-sm'
          )}
        >
          {icon}
        </span>
      )}

      {children}

      {iconPosition === 'right' && icon && (
        <span
          className={cn(
            'absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2',
            'flex size-8 items-center justify-center rounded-full',
            'bg-bg-primary text-text-inverse',
            'ring-2 ring-bg-plain',
            'shadow-sm'
          )}
        >
          {icon}
        </span>
      )}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
