import { Provider } from '@/components/Provider';
import { AuthForm } from '@/components/forms/AuthForm';

const SigninPage = () => {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <Provider>
        <AuthForm mode="signin" />
      </Provider>
    </div>
  );
};

export default SigninPage;
