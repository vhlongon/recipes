'use client';

import { logoutOutUser } from '@/lib/api';
import { useUserSlice } from '@/store/stateHooks';
import { useRouter } from 'next/navigation';
import { LogOut as LogOutIcon } from 'react-feather';

export const LogoutUser = () => {
  const router = useRouter();
  const { logout, user } = useUserSlice();

  const onClick = async () => {
    await logoutOutUser();
    logout();
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
