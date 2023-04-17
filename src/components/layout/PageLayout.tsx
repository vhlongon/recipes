import { Sidebar } from '@/components/layout/SideBar';
import { Panel } from '@/components/ui/Panel';
import { getUser } from '@/lib/data';
import '../../styles/globals.css';
import { Preloader } from '../Preloader';
import { Provider } from '../Provider';

export const metadata = {
  title: 'Smart recipes generator',
  description: 'Generate recipes using AI',
};

const PageLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  return (
    <div className="h-full w-full min-h-screen bg-gradient p-6 grid grid-rows-sidebar grid-cols-1 md:grid-cols-sidebar md:grid-rows-none gap-8">
      <Preloader user={user} />
      <Panel as="aside" className="w-full h-full">
        <Provider>
          <Sidebar />
        </Provider>
      </Panel>
      <Panel as="main" className="w-full h-full">
        {children}
      </Panel>
    </div>
  );
};

export default PageLayout;
