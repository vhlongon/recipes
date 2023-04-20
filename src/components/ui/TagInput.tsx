import { VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';
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
      neutral: [''],
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
      <div>
        {label && (
          <label className="label">
            <span className={labelTextClassname}>{label}</span>
            {altText && <span className={labelTextAltClassname}>{altText}</span>}
          </label>
        )}
        <div className={clsx(inputClassname, 'px-0', 'h-auto')}>
          <TagsInput
            value={tags}
            onChange={handleChange}
            onBlur={onBlur}
            onRemoved={onRemoved}
            name={name}
            classNames={{
              input: 'bg-base-100',
              tag: 'bg-base-200 text-base-content',
            }}
            placeHolder={placeHolder}
          />
        </div>
      </div>
      <div>
        <em className="px-2 text-xs text-base-content">press enter or comma to add new tag</em>
      </div>
    </div>
  );
};
