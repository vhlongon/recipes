import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const cardClsses = cva(['card', 'w-full', 'shadow-xl'], {
  variants: {
    bg: {
      gray: ['bg-base-100', 'text-slate-100'],
      primary: ['bg-primary', 'text-slate-100'],
      secondary: ['bg-secondary', 'text-slate-100'],
      accent: ['bg-accent', 'text-slate-100'],
      transparent: ['bg-transparent', 'text-current'],
      offwhite: ['bg-slate-100', 'text-slate-800'],
    },
    bordered: {
      true: ['card-bordeded'],
    },
    spacing: {
      normal: ['card-normal'],
      compact: ['card-compact'],
    },
  },
  defaultVariants: {
    bg: 'offwhite',
    spacing: 'normal',
  },
});

type CardProps = {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
  className?: string;
} & VariantProps<typeof cardClsses>;

export const Card = ({
  title,
  actions,
  className,
  bg,
  bordered,
  spacing,
  children,
}: CardProps) => {
  const classNames = cardClsses({ className, bg, bordered, spacing });
  return (
    <div className={classNames}>
      <div className="card-body">
        {title && <h2 className="card-title">{title}</h2>}
        {children}
        <div className="card-actions justify-end">{actions}</div>
      </div>
    </div>
  );
};
