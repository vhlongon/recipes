import { Preloader } from '@/components/Preloader';
import { Provider } from '@/components/Provider';
import { UserIndicator } from '@/components/layout/UserIndicator';
import { getUser } from '@/lib/data';
import '../styles/globals.css';

export const metadata = {
  title: 'Smart recipes generator',
  description: 'Generate recipes using AI',
};

export const revalidate = 0;

const RootPageLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  console.log(user);

  return (
    <html lang="en" data-theme="light">
      <body className="md:overflow-y-hidden">
        <div id="modal-root"></div>
        {children}
        <Preloader user={user} />

        <Provider>
          <UserIndicator />
        </Provider>
      </body>
    </html>
  );
};

export default RootPageLayout;
