import PageLayout from '@/components/PageLayout';
import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <PageLayout>{children}</PageLayout>;
};

export default AuthLayout;
