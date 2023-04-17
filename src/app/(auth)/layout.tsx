import PageLayout from '@/components/layout/PageLayout';
import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <PageLayout>{children}</PageLayout>;
};

export default AuthLayout;
