'use client';
import { useUserSlice } from '@/store/stateHooks';
import { usePathname } from 'next/navigation';
import { ProfileImage } from './ProfileImage';

export const UserIndicator = () => {
  const { user } = useUserSlice();
  const pathname = usePathname();
  const isRoot = pathname === '/';

  return (
    <div>
      {user && !isRoot && (
        <div className="indicator absolute left-8 top-10">
          <span className="badge-primary badge indicator-item">
            {user.firstName.charAt(0).toUpperCase()}
            {user.lastName.charAt(0).toUpperCase()}
          </span>
          <ProfileImage src={user.image ?? ''} size="sm" />
        </div>
      )}
    </div>
  );
};
