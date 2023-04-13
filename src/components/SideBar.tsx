import { Route } from 'next';
import { IconLink, LinkIconProps } from './IconLink';

const links: LinkIconProps<string>[] = [
  { label: 'Home', icon: 'Home', href: '/' },
  { label: 'Dashboard', icon: 'Grid', href: '/home' },
  { label: 'Profile', icon: 'User', href: '/profile' },
  { label: 'Settings', icon: 'Settings', href: '/settings' },
  {
    label: 'Logout',
    icon: 'LogOut',
    href: '/api/logout' as Route,
    isHighlighted: false,
  },
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
