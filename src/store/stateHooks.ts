import { ContextUser } from '@/types';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '.';
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
