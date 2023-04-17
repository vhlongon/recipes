'use client';

import { useRef } from 'react';
import { store } from '@/store';
import { setUser, ContextUser } from '@/store/userSlice';

export const Preloader = ({ user }: { user: ContextUser }) => {
  const loaded = useRef(false);

  if (!loaded.current) {
    store.dispatch(setUser(user));
    loaded.current = true;
  }

  return null;
};
