'use client';

import { useUserSlice } from '@/store/stateHooks';

export const GreetingsTitle = () => {
  const { user } = useUserSlice();
  return (
    <span className="text-base-content">
      Hello {user?.firstName} {user?.lastName}
    </span>
  );
};
