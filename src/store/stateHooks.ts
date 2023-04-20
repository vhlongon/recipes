import { ContextUser } from '@/types';
import { Theme } from '@prisma/client';
import { AppDispatch, RootState } from '.';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { setTheme as setThemeAction } from './themeSlice';
import { logout as logoutAction, setUser as setUserAction } from './userSlice';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useUserSlice = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  const setUser = (user: ContextUser) => dispatch(setUserAction(user));
  const logout = () => dispatch(logoutAction());

  return { user, setUser, logout };
};

export const useThemeSlice = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(state => state.theme);
  const setTheme = (theme: Theme) => dispatch(setThemeAction(theme));

  return { theme, setTheme };
};
