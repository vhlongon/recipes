import { VariantProps, cva } from 'class-variance-authority';
import React, { ReactNode } from 'react';
import { CardImage } from './CardImage';

const cardClasses = cva(['card', 'bg-base-100', 'w-full', 'shadow-xl'], {
  variants: {
    bordered: {
      true: ['card-bordeded'],
    },
    spacing: {
      normal: ['card-normal'],
      compact: ['card-compact'],
      side: ['card-side'],
    },
  },
  defaultVariants: {
    spacing: 'normal',
  },
});

type CardProps = {
  children?: React.ReactNode;
  title?: ReactNode;
  actions?: React.ReactNode;
  className?: string;
  image?: string | null;
} & VariantProps<typeof cardClasses>;

export const Card = ({ title, actions, className, bordered, spacing, children, image }: CardProps) => {
  const classNames = cardClasses({ bordered, spacing, className });

  return (
    <div className={classNames}>
      {image && <CardImage src={image} alt="recipe" fill />}
      <div className="card-body justify-between overflow-y-scroll">
        {title && <h2 className="card-title">{title}</h2>}
        {children}
        {actions && <div className="card-actions justify-end">{actions}</div>}
      </div>
    </div>
  );
};
