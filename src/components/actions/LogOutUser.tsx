'use client';

import { logoutOutUser } from '@/lib/api';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout } from '@/store/userSlice';
import { useRouter } from 'next/navigation';
import { LogOut as LogOutIcon } from 'react-feather';

export const LogoutUser = () => {
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
          <span className="flex w-full cursor-pointer items-center justify-center" title="Log out" role="button">
            <LogOutIcon className="stroke-slate-100" size={40} onClick={onClick} />
          </span>
        </>
      )}
    </>
  );
};
