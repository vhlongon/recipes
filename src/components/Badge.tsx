import { VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';
import React from 'react';

type BaaseProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

const badgeClasses = cva(['badge', 'py-3'], {
  variants: {
    variant: {
      neutral: [],
      outline: ['badge-outline'],
      primary: ['badge-primary'],
      secondary: ['badge-secondary'],
      accent: ['badge-accent'],
      ghost: ['badge-ghost'],
      info: ['badge-info'],
      success: ['badge-success'],
      warning: ['badge-warning'],
      error: ['badge-error'],
    },
    size: {
      sm: ['badge-sm'],
      md: ['badge-md'],
      lg: ['badge-lg'],
      xs: ['badge-xs'],
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'neutral',
  },
});

export type BadgeProps = BaaseProps &
  VariantProps<typeof badgeClasses> & { icon?: React.ReactNode };

export const Badge = ({
  variant,
  size,
  className,
  children,
  icon,
  ...rest
}: BadgeProps) => {
  return (
    <span
      className={clsx(
        badgeClasses({ variant, size, className }),
        icon && 'gap-1'
      )}
      {...rest}
    >
      {icon}
      {children}
    </span>
  );
};
