'use client';

import { store } from '@/store';
import { ContextUser, setUser } from '@/store/userSlice';
import { useRef } from 'react';

type PreloadProps = {
  user: ContextUser;
};

export const Preloader = ({ user }: PreloadProps) => {
  const loaded = useRef(false);

  if (!loaded.current) {
    store.dispatch(setUser(user));
    loaded.current = true;
  }

  return null;
};
