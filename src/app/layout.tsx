import { Preloader } from '@/components/Preloader';
import { Provider } from '@/components/Provider';
import { UserIndicator } from '@/components/layout/UserIndicator';
import { getUser, getUserSettings } from '@/lib/data';
import { Theme } from '@prisma/client';
import '../styles/globals.css';

export const metadata = {
  title: 'Smart recipes generator',
  description: 'Generate recipes using AI',
};

export const revalidate = 0;

const RootPageLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  const settings = await getUserSettings();
  const theme = settings?.theme?.toLowerCase() as Theme;

  return (
    <>
      <Preloader user={user} />
      <html lang="en" data-theme={theme || Theme.DARK.toLowerCase()}>
        <body className="md:overflow-y-hidden">
          <div id="modal-root"></div>
          {children}

          <Provider>
            <UserIndicator />
          </Provider>
        </body>
      </html>
    </>
  );
};

export default RootPageLayout;
