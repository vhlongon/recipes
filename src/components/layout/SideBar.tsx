import { getUser } from '@/lib/data';
import { Provider } from '../Provider';
import { LogoutUser } from '../actions/LogOutUser';
import { IconLink, LinkIconProps } from '../ui/IconLink';

const links: LinkIconProps<string>[] = [
  { label: 'Dashboard', icon: 'Grid', href: '/home' },
  { label: 'Profile', icon: 'User', href: '/profile' },
  { label: 'Settings', icon: 'Settings', href: '/settings' },
];

export const SideBarSkeleton = () => {
  return (
    <div className="relative flex h-full animate-pulse rounded-2xl md:flex-wrap">
      {links.map(link => (
        <IconLink {...link} key={link.href} className="pointer-events-none" />
      ))}
    </div>
  );
};

export const Sidebar = async () => {
  const user = await getUser();

  return (
    <div className="relative flex h-full rounded-2xl md:flex-wrap">
      {links.map(link => (
        <IconLink {...link} key={link.href} />
      ))}
      {user && (
        <Provider>
          <LogoutUser />
        </Provider>
      )}
    </div>
  );
};
