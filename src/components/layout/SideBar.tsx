import { Logout } from '../actions/LogOut';
import { IconLink, LinkIconProps } from '../ui/IconLink';

const links: LinkIconProps<string>[] = [
  { label: 'Dashboard', icon: 'Grid', href: '/home' },
  { label: 'Profile', icon: 'User', href: '/profile' },
  { label: 'Settings', icon: 'Settings', href: '/settings' },
];

export const Sidebar = () => {
  return (
    <div className="rounded-2xl h-full flex md:flex-wrap relative">
      {links.map(link => (
        <IconLink {...link} key={link.href} />
      ))}
      <Logout />
    </div>
  );
};
