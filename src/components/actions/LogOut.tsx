'use client';

import { logoutOutUser } from '@/lib/api';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { LogOut as LogOutIcon } from 'react-feather';
import { ProfileImage } from '../layout/ProfileImage';

type LogOutProps = {
  user: Pick<User, 'firstName' | 'lastName' | 'image'>;
};

export const Logout = ({ user }: LogOutProps) => {
  const router = useRouter();

  const onClick = async () => {
    await logoutOutUser();
    router.refresh();
  };

  return (
    <>
      <div className="indicator absolute top-4 left-2">
        <span className="indicator-item badge badge-primary">
          {user.firstName.charAt(0).toUpperCase()}
          {user.lastName.charAt(0).toUpperCase()}
        </span>
        <ProfileImage src={user.image ?? ''} size="sm" />
      </div>
      <span
        className="w-full flex justify-center items-center cursor-pointer"
        title="Log out"
        role="button"
      >
        <LogOutIcon className="stroke-slate-100" size={40} onClick={onClick} />
      </span>
    </>
  );
};
