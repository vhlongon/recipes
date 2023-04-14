import PageLayout from '@/components/PageLayout';
import { ReactNode } from 'react';

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return <PageLayout>{children}</PageLayout>;
};

export default ProfileLayout;
