import { Provider } from '@/components/Provider';
import { AuthForm } from '@/components/forms/AuthForm';

const SigninPage = () => {
  return (
    <div className="flex flex-1 justify-center w-full h-full items-center">
      <Provider>
        <AuthForm mode="signin" />
      </Provider>
    </div>
  );
};

export default SigninPage;
