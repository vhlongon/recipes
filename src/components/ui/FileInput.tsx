import { VariantProps, cva } from 'class-variance-authority';
import React, { ReactNode } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

const fileInputClasses = cva(['file-input', ' w-full', 'bg-transparent'], {
  variants: {
    variant: {
      bordered: ['file-input-bordered'],
      ghost: ['file-input-ghost'],
    },
    color: {
      primary: ['file-input-primary'],
      secondary: ['file-input-secondary'],
      accent: ['file-input-accent'],
      info: ['file-input-info'],
      success: ['file-input-success'],
      warning: ['file-input-warning'],
      error: ['file-input-error'],
      transparent: ['bg-transparent', 'text-current'],
      offwhite: ['bg-slate-100', 'text-slate-800'],
    },
    size: {
      lg: ['file-input-lg'],
      md: ['file-input-md'],
      sm: ['file-input-sm'],
      xs: ['file-input-lxs'],
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

type FileInputBaseProps = Omit<
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
>;

type FileInputProps = FileInputBaseProps & {
  label?: ReactNode;
  altText?: string;
  name: string;
  register: UseFormRegister<FieldValues>;
} & VariantProps<typeof fileInputClasses>;

export const FileInput = ({
  variant,
  color,
  size,
  label,
  altText,
  id,
  register,
  required,
  name,
  ...props
}: FileInputProps) => {
  const inputClassname = fileInputClasses({ variant, color, size });
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
        type="file"
        {...register(name, {
          required: required ? `Required` : false,
        })}
        {...props}
        className={inputClassname}
      />
    </>
  );
};
