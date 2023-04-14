import PageLayout from '@/components/PageLayout';
import { ReactNode } from 'react';

const SettingsLayout = ({ children }: { children: ReactNode }) => {
  return <PageLayout>{children}</PageLayout>;
};

export default SettingsLayout;
