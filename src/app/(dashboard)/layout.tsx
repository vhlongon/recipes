import PageLayout from '@/components/layout/PageLayout';
import { ReactNode } from 'react';

const DashBoardLayout = ({ children }: { children: ReactNode }) => {
  return <PageLayout>{children}</PageLayout>;
};

export default DashBoardLayout;
