import { VariantProps, cva } from 'class-variance-authority';
import React, { ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';

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
      xs: ['input-xs'],
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

type InputBaseProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
> & { type: 'text' | 'email' | 'password' | 'number' };

type InputProps = InputBaseProps & {
  label?: ReactNode;
  altText?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
} & VariantProps<typeof inputClasses>;

export const Input = ({ variant, color, size, label, altText, id, register, required, name, ...props }: InputProps) => {
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
      <input
        id={id}
        {...register(name, {
          required: required ? `Required` : false,
          ...(props.type === 'email'
            ? {
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'value is not a valid email',
                },
              }
            : {}),
          ...(props.type === 'password'
            ? {
                minLength: {
                  value: 4,
                  message: 'Password must have at least 4 characters',
                },
              }
            : {}),
        })}
        {...props}
        className={inputClassname}
      />
    </>
  );
};
