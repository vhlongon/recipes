'use client';
import clsx from 'clsx';
import { Route } from 'next';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Grid, Home, Settings, User, LogOut } from 'react-feather';

const icons = { Settings, User, Grid, Calendar, Home, LogOut } as const;

type IconType = keyof typeof icons;

export type LinkIconProps<T extends string> = {
  icon: IconType;
  href: Route<T>;
  label: string;
  isHighlighted?: boolean;
  className?: string;
};

export const IconLink = <T extends string>({
  href,
  icon,
  isHighlighted = true,
  className,
}: LinkIconProps<T>) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const Icon = icons[icon];
  return (
    <NextLink href={href} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={clsx(
          isActive && isHighlighted ? 'link-primary' : 'stroke-slate-100',
          'transition duration-200 ease-in-out',
          className
        )}
      />
    </NextLink>
  );
};
