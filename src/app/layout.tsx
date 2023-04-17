import '../styles/globals.css';

export const metadata = {
  title: 'Smart recipes generator',
  description: 'Generate recipes using AI',
};

const RootPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" data-theme="light">
      <body className="md:overflow-y-hidden">
        <div id="modal-root"></div>
        {children}
      </body>
    </html>
  );
};

export default RootPageLayout;
