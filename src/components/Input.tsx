import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const inputClasses = cva(['input', ' w-full', 'bg-transparent'], {
  variants: {
    variant: {
      bordered: ['input-bordered'],
      ghost: ['input-ghost'],
    },
    color: {
      primary: ['input-primary'],
      secondary: ['input-secondary'],
      accent: ['input-accent'],
      info: ['input-info'],
      success: ['input-success'],
      warning: ['input-warning'],
      error: ['input-error'],
      transparent: ['bg-transparent', 'text-current'],
      offwhite: ['bg-slate-100', 'text-slate-800'],
    },
    size: {
      lg: ['input-lg'],
      md: ['input-md'],
      sm: ['input-sm'],
      xs: ['input-lxs'],
    },
  },
  defaultVariants: {
    variant: 'bordered',
    color: 'offwhite',
    size: 'md',
  },
});

const labelClasses = cva([''], {
  variants: {
    color: {
      primary: ['label-primary'],
      secondary: ['label-secondary'],
      accent: ['label-accent'],
      info: ['label-info'],
      success: ['label-success'],
      warning: ['label-warning'],
      error: ['label-error'],
      transparent: ['bg-transparent', 'text-current'],
      offwhite: ['text-black'],
    },
  },
  defaultVariants: {
    color: 'offwhite',
  },
});

type InputBaseProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputProps = InputBaseProps & {
  label?: string;
  altText?: string;
} & VariantProps<typeof inputClasses>;

export const Input = ({
  variant,
  color,
  size,
  label,
  altText,
  id,
  ...props
}: InputProps) => {
  const inputClassname = inputClasses({ variant, color, size });
  const labelTextClassname = labelClasses({ color, class: 'label-text' });
  const labelTextAltClassname = labelClasses({
    color,
    class: 'label-text-alt',
  });

  return (
    <>
      {label && (
        <label className="label" htmlFor={id}>
          <span className={labelTextClassname}>{label}</span>
          {altText && <span className={labelTextAltClassname}>{altText}</span>}
        </label>
      )}
      <input id={id} {...props} className={inputClassname} />
    </>
  );
};
