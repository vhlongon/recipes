import { getUser } from '@/lib/data';
import { IconLink, LinkIconProps } from '../ui/IconLink';
import { Logout } from '../actions/LogOut';

const links: LinkIconProps<string>[] = [
  { label: 'Dashboard', icon: 'Grid', href: '/home' },
  { label: 'Profile', icon: 'User', href: '/profile' },
  { label: 'Settings', icon: 'Settings', href: '/settings' },
];

export const Sidebar = async () => {
  const user = await getUser();

  return (
    <div className="rounded-2xl h-full flex md:flex-wrap relative">
      {links.map(link => (
        <IconLink {...link} key={link.href} />
      ))}
      {user && <Logout user={user} />}
    </div>
  );
};
