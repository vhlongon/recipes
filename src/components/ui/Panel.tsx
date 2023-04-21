import React, { ReactNode } from 'react';
import clsx from 'clsx';

type PanelProps = {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
};

export const Panel = ({ children, className, as: Component = 'div' }: PanelProps) => {
  return (
    <Component
      className={clsx('glassPanel rounded-box border-2 border-solid border-base-100 text-base-content', className)}>
      {children}
    </Component>
  );
};
