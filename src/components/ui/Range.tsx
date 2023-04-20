import { VariantProps, cva } from 'class-variance-authority';
import React, { ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';

const rangeClasses = cva(['range', ' w-full', 'bg-transparent'], {
  variants: {
    variant: {
      bordered: ['range-bordered'],
      ghost: ['range-ghost'],
    },
    color: {
      primary: ['range-primary'],
      secondary: ['range-secondary'],
      accent: ['range-accent'],
      info: ['range-info'],
      success: ['range-success'],
      warning: ['range-warning'],
      error: ['range-error'],
      transparent: ['bg-transparent', 'text-current'],
      offwhite: ['bg-slate-100', 'text-slate-800'],
    },
    size: {
      lg: ['range-lg'],
      md: ['range-md'],
      sm: ['range-sm'],
      xs: ['range-xs'],
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

type RangeInputBaseProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type' | 'min' | 'max' | 'step'
>;

type InputProps = RangeInputBaseProps & {
  label?: ReactNode;
  altText?: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  min: number;
  max: number;
  step?: number;
} & VariantProps<typeof rangeClasses>;

export const Range = ({ variant, color, size, label, altText, id, register, required, name, ...props }: InputProps) => {
  const inputClassname = rangeClasses({ variant, color, size });
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
      <div className=" flex flex-1 justify-between">
        <span className="text-xs text-slate-600">{props.min}</span>
        <span className="text-xs text-slate-600">{props.max}</span>
      </div>
      <input
        id={id}
        type="range"
        {...register(name, {
          required: required ? `Required` : false,
        })}
        {...props}
        className={inputClassname}
      />
      {props.step && (
        <div className="flex w-full justify-between px-2 text-xs">
          {Array.from({ length: props.max / props.step }, (_, i) => (
            <span key={i} className="text-slate-600">
              |
            </span>
          ))}
        </div>
      )}
    </>
  );
};
