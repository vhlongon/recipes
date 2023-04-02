import { Panel } from '@/components/Panel';
import { RootLayout } from '@/components/RootLayout';
import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <RootLayout>
      <div className="h-screen w-screen bg-gradient">
        <Panel className="w-full h-full flex items-center justify-center">
          {children}
        </Panel>
      </div>
    </RootLayout>
  );
};

export default AuthLayout;
