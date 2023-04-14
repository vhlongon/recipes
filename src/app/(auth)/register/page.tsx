import { AuthForm } from '@/components/forms/AuthForm';

const RegisterPage = () => {
  return (
    <div className="flex flex-1 justify-center w-full h-full items-center">
      <AuthForm mode="register" />
    </div>
  );
};

export default RegisterPage;
