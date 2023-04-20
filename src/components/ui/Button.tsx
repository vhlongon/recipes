import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

export type ButtonBaseProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const buttonClasses = cva(['btn'], {
  variants: {
    variant: {
      primary: ['btn-primary'],
      secondary: ['btn-secondary'],
      accent: ['btn-accent'],
      ghost: ['btn-ghost'],
      link: ['btn-link'],
    },
    size: {
      sm: ['btn-sm'],
      md: ['btn-md'],
      lg: ['btn-lg'],
    },
    outline: {
      true: ['btn-outline'],
    },
    square: {
      true: ['btn-square'],
    },
    circle: {
      true: ['btn-circle'],
    },
    loading: {
      true: ['loading'],
    },
    block: {
      true: ['btn-block'],
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
});

export type ButtonProps = ButtonBaseProps & VariantProps<typeof buttonClasses>;

export const Button = ({
  variant,
  size,
  outline,
  square,
  circle,
  loading,
  block,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={buttonClasses({
        size,
        variant,
        className,
        outline,
        square,
        circle,
        loading,
        block,
      })}>
      {loading ? 'Loading' : children}
    </button>
  );
};
