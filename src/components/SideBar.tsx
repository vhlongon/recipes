import Image from 'next/image';
import { Card } from './Card';
import { IconLink, LinkIconProps } from './IconLink';

const links: LinkIconProps[] = [
  { label: 'Home', icon: 'Grid', href: '/home' },
  { label: 'Profile', icon: 'User', href: '/profile' },
  { label: 'Settings', icon: 'Settings', href: '/settings' },
];

export const Sidebar = () => {
  return (
    <div className="rounded-2xl h-full flex md:flex-wrap">
      {links.map(link => (
        <IconLink {...link} key={link.href} />
      ))}
    </div>
  );
};
