import { SideBarSkeleton, Sidebar } from '@/components/layout/SideBar';
import { Panel } from '@/components/ui/Panel';
import '../../styles/globals.css';
import React from 'react';

export const metadata = {
  title: 'Smart recipes generator',
  description: 'Generate recipes using AI',
};

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient grid h-full min-h-screen w-full grid-cols-1 grid-rows-sidebar gap-8 p-6 md:grid-cols-sidebar md:grid-rows-none">
      <Panel as="aside" className="h-full w-full">
        <React.Suspense fallback={<SideBarSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <Sidebar />
        </React.Suspense>
      </Panel>
      <Panel as="main" className="h-full max-h-screen w-full">
        {children}
      </Panel>
    </div>
  );
};

export default PageLayout;
