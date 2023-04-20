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
      className={clsx(
        'rounded-2xl border-2 border-solid border-gray-200 bg-white bg-opacity-40 text-slate-800 backdrop-blur-lg backdrop-saturate-200',
        className
      )}>
      {children}
    </Component>
  );
};
