'use client';
import NextLink from 'next/link';
import { Settings, User, Grid, Calendar } from 'react-feather';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const icons = { Settings, User, Grid, Calendar } as const;

type IconType = keyof typeof icons;

export type LinkIconProps = {
  icon: IconType;
  href: string;
  label: string;
};

export const IconLink = ({ href, icon }: LinkIconProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const Icon = icons[icon];
  return (
    <NextLink href={href} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={clsx(
          isActive ? 'stroke-secondary-focus' : 'stroke-slate-100',
          'transition duration-200 ease-in-out'
        )}
      />
    </NextLink>
  );
};
