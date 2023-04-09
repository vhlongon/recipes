import { Panel } from '@/components/Panel';
import { Sidebar } from '@/components/SideBar';
import '../styles/globals.css';

export const metadata = {
  title: 'Smart recipes generator',
  description: 'Generate recipes using AI',
};

const RootPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" data-theme="dark">
      <body className="md:overflow-y-hidden">
        <div id="modal-root"></div>
        <div className="h-full w-full min-h-screen bg-gradient p-6 grid grid-rows-sidebar grid-cols-1 md:grid-cols-sidebar md:grid-rows-none gap-8">
          <Panel as="aside" className="w-full h-full">
            <Sidebar />
          </Panel>
          <Panel as="main" className="w-full h-full">
            {children}
          </Panel>
        </div>
      </body>
    </html>
  );
};

export default RootPageLayout;
