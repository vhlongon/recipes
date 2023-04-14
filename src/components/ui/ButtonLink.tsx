'use client';

import { useRouter } from 'next/navigation';
import { Button, ButtonProps } from './Button';

type ButtonLinkProps = {
  href: string;
} & ButtonProps;

export const ButtonLink = ({ href, children, ...rest }: ButtonLinkProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <Button {...rest} onClick={handleClick}>
      {children}
    </Button>
  );
};
