import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

const selectClasses = cva(['select', ' w-full', 'bg-transparent'], {
  variants: {
    variant: {
      bordered: ['select-bordered'],
      ghost: ['select-ghost'],
    },
    color: {
      primary: ['select-primary'],
      secondary: ['select-secondary'],
      accent: ['select-accent'],
      info: ['select-info'],
      success: ['select-success'],
      warning: ['select-warning'],
      error: ['select-error'],
      transparent: ['bg-transparent', 'text-current'],
      neutral: [''],
    },
    size: {
      lg: ['select-lg'],
      md: ['select-md'],
      sm: ['select-sm'],
      xs: ['select-lxs'],
    },
  },
  defaultVariants: {
    variant: 'bordered',
    color: 'neutral',
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
      neutral: [''],
    },
  },
  defaultVariants: {
    color: 'neutral',
  },
});

type SelectBaseProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

type SelectProps = SelectBaseProps & {
  label?: string;
  altText?: string;
  options: { value: string; label: string; selected?: boolean }[];
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
} & VariantProps<typeof selectClasses>;

export const Select = ({
  variant,
  color,
  size,
  label,
  altText,
  register,
  name,
  required,
  id,
  ...props
}: SelectProps) => {
  const selectClassname = selectClasses({ variant, color, size });
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
      <select
        {...register(name, {
          required: required ? `Required` : false,
        })}
        className={selectClassname}
        {...props}>
        {props.options.map((option, index) => (
          <option key={index} value={option.value} selected={option.selected}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};
