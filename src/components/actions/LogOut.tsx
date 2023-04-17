'use client';

import { logoutOutUser } from '@/lib/api';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout } from '@/store/userSlice';
import { useRouter } from 'next/navigation';
import { LogOut as LogOutIcon } from 'react-feather';
import { ProfileImage } from '../layout/ProfileImage';

export const Logout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => {
    return state.user;
  });

  const onClick = async () => {
    await logoutOutUser();
    dispatch(logout());
    router.push('/signin');
  };

  return (
    <>
      {user && (
        <>
          <div className="indicator absolute top-4 left-2">
            <span className="indicator-item badge badge-primary">
              {user?.firstName.charAt(0).toUpperCase()}
              {user?.lastName.charAt(0).toUpperCase()}
            </span>
            <ProfileImage src={user?.image ?? ''} size="sm" />
          </div>
          <span
            className="w-full flex justify-center items-center cursor-pointer"
            title="Log out"
            role="button"
          >
            <LogOutIcon
              className="stroke-slate-100"
              size={40}
              onClick={onClick}
            />
          </span>
        </>
      )}
    </>
  );
};
