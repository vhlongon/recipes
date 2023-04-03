import { Panel } from '@/components/Panel';
import '../styles/globals.css';

export const metadata = {
  title: 'Smart recipes generator',
  description: 'Generate recipes using AI',
};

const RootPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="h-screen w-screen bg-gradient p-6">
          <Panel className="w-full h-full flex items-center justify-center">
            {children}
          </Panel>
        </div>
      </body>
    </html>
  );
};

export default RootPageLayout;
