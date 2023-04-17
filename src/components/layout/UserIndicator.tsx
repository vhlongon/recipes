'use client';
import { useAppSelector } from '@/store';
import { ProfileImage } from './ProfileImage';

export const UserIndicator = () => {
  const { user } = useAppSelector(state => state.user);
  return (
    <div>
      {user && (
        <div className="indicator absolute top-10 left-8">
          <span className="indicator-item badge badge-primary">
            {user.firstName.charAt(0).toUpperCase()}
            {user.lastName.charAt(0).toUpperCase()}
          </span>
          <ProfileImage src={user.image ?? ''} size="sm" />
        </div>
      )}
    </div>
  );
};
