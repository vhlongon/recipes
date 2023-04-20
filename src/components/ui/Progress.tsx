import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

type ProgressBaseProps = React.DetailedHTMLProps<
  React.ProgressHTMLAttributes<HTMLProgressElement>,
  HTMLProgressElement
>;

const progressClasses = cva(['progress', 'w-56'], {
  variants: {
    color: {
      primary: ['progress-primary'],
      secondary: ['progress-secondary'],
      accent: ['progress-accent'],
      info: ['progress-info'],
      success: ['progress-success'],
      warning: ['progress-warning'],
      error: ['progress-error'],
    },
  },
});
type ProgressProps = ProgressBaseProps & VariantProps<typeof progressClasses>;

export const Progress = ({ color, value, max = '100', className, ...props }: ProgressProps) => {
  return <progress className={progressClasses({ className, color })} value={value} max={max} {...props} />;
};
