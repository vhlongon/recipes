'use client';

import { useAppSelector } from '@/store';
import React from 'react';

export const GreetingsTitle = () => {
  const { user } = useAppSelector(state => state.user);
  return (
    <span>
      Hello {user?.firstName} {user?.lastName}
    </span>
  );
};
