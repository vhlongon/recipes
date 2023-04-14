import { AuthForm } from '@/components/forms/AuthForm';

const SigninPage = () => {
  return (
    <div className="flex flex-1 justify-center w-full h-full items-center">
      <AuthForm mode="signin" />
    </div>
  );
};

export default SigninPage;
