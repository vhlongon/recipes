import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

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
      offwhite: [''],
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
      offwhite: [''],
    },
  },
  defaultVariants: {
    color: 'offwhite',
  },
});

type SelectBaseProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;

type SelectProps = SelectBaseProps & {
  label?: string;
  altText?: string;
  options: { value: string; label: string; selected?: boolean }[];
} & VariantProps<typeof selectClasses>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ variant, color, size, label, altText, id, ...props }, ref) => {
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
        <select {...props} ref={ref} className={selectClassname}>
          {props.options.map((option, index) => (
            <option key={index} value={option.value} selected={option.selected}>
              {option.label}
            </option>
          ))}
        </select>
      </>
    );
  }
);
Select.displayName = 'Select';
