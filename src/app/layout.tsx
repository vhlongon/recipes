import { Preloader } from '@/components/Preloader';
import { Provider } from '@/components/Provider';
import { UserIndicator } from '@/components/layout/UserIndicator';
import { getUser } from '@/lib/data';
import '../styles/globals.css';

export const metadata = {
  title: 'Smart recipes generator',
  description: 'Generate recipes using AI',
};

const RootPageLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  return (
    <html lang="en" data-theme="light">
      <body className="md:overflow-y-hidden">
        <div id="modal-root"></div>
        {children}
        <Preloader user={user} />

        {user && (
          <Provider>
            <UserIndicator />
          </Provider>
        )}
      </body>
    </html>
  );
};

export default RootPageLayout;
