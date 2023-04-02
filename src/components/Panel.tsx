import React, { ReactNode } from 'react';
import clsx from 'clsx';

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export const Panel = ({ children, className }: PanelProps) => {
  return (
    <div
      className={clsx(
        'rounded border-solid border-2 border-gray-200 backdrop-blur-lg backdrop-saturate-200 bg-white bg-opacity-30',
        className
      )}
    >
      {children}
    </div>
  );
};
