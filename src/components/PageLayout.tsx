import { Panel } from '@/components/Panel';
import { Sidebar } from '@/components/SideBar';
import '../styles/globals.css';

export const metadata = {
  title: 'Smart recipes generator',
  description: 'Generate recipes using AI',
};

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full min-h-screen bg-gradient p-6 grid grid-rows-sidebar grid-cols-1 md:grid-cols-sidebar md:grid-rows-none gap-8">
      <Panel as="aside" className="w-full h-full">
        {/* @ts-expect-error Async Server Component */}
        <Sidebar />
      </Panel>
      <Panel as="main" className="w-full h-full">
        {children}
      </Panel>
    </div>
  );
};

export default PageLayout;
