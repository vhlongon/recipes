import PageLayout from '@/components/layout/PageLayout';
import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  /* @ts-expect-error Async Server Component */
  return <PageLayout>{children}</PageLayout>;
};

export default AuthLayout;
