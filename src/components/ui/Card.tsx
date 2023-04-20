import { VariantProps, cva } from 'class-variance-authority';
import React, { ReactNode } from 'react';
import { CardImage } from './CardImage';

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
  children?: React.ReactNode;
  title?: ReactNode;
  actions?: React.ReactNode;
  className?: string;
  image?: string | null;
} & VariantProps<typeof cardClsses>;

export const Card = ({ title, actions, className, bg, bordered, spacing, children, image }: CardProps) => {
  const classNames = cardClsses({ bg, bordered, spacing, className });

  return (
    <div className={classNames}>
      {image && <CardImage src={image} alt="recipe" />}
      <div className="card-body justify-between overflow-y-scroll">
        {title && <h2 className="card-title">{title}</h2>}
        {children}
        {actions && <div className="card-actions justify-end">{actions}</div>}
      </div>
    </div>
  );
};
