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
    <div className="h-full w-full min-h-screen bg-gradient p-6 grid grid-rows-sidebar grid-cols-1 md:grid-cols-sidebar md:grid-rows-none gap-8">
      <Panel as="aside" className="w-full h-full">
        <React.Suspense fallback={<SideBarSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <Sidebar />
        </React.Suspense>
      </Panel>
      <Panel as="main" className="w-full h-full">
        {children}
      </Panel>
    </div>
  );
};

export default PageLayout;
