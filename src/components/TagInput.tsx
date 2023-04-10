import { VariantProps, cva } from 'class-variance-authority';
import { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';

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

type TagInputProps = {
  name: string;
  placeHolder?: string;
  onChange: (tags: string[]) => void;
  onBlur?: () => void;
  tags?: string[];
  label?: string;
  altText?: string;
  onRemoved?: (tag: string) => void;
} & VariantProps<typeof inputClasses>;

export const TagInput = ({
  tags = [],
  onChange,
  name,
  placeHolder,
  label,
  altText,
  color,
  variant,
  onBlur,
  size,
  onRemoved,
}: TagInputProps) => {
  const inputClassname = inputClasses({ variant, color, size });
  const labelTextClassname = labelClasses({ color, class: 'label-text' });
  const labelTextAltClassname = labelClasses({
    color,
    class: 'label-text-alt',
  });

  const handleChange = (tags: string[]) => {
    onChange(tags);
  };

  return (
    <div>
      {label && (
        <label className="label">
          <span className={labelTextClassname}>{label}</span>
          {altText && <span className={labelTextAltClassname}>{altText}</span>}
        </label>
      )}
      <TagsInput
        value={tags}
        onChange={handleChange}
        onBlur={onBlur}
        onRemoved={onRemoved}
        name={name}
        classNames={{
          input: 'bg-slate-100',
          tag: 'bg-slate-200',
        }}
        placeHolder={placeHolder}
      />
      <em className="text-xs text-slate-600 px-2">
        press enter or comma to add new tag
      </em>
    </div>
  );
};