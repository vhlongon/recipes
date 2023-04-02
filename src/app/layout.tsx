import { RootLayout } from '@/components/RootLayout';
import '../styles/globals.css';
import { Panel } from '@/components/Panel';

export const metadata = {
  title: 'Smart recipes generator',
  description: 'Generate recipes using AI',
};

const RootPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <RootLayout>
          <div className="h-screen w-screen bg-gradient">
            <Panel className="w-full h-full flex items-center justify-center">
              {children}
            </Panel>
          </div>
        </RootLayout>
      </body>
    </html>
  );
};

export default RootPageLayout;
