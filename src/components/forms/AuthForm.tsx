'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { register, signin } from '@/lib/api';
import { setUser } from '@/store/userSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '../ui/ErrorMessage';
import { useAppDispatch } from '@/store';

const texts = {
  register: {
    linkUrl: '/signin',
    linkText: 'Already have an account?',
    header: 'Create a new Account',
    subheader: 'Just a few things to get started',
    buttonText: 'Register',
  },
  signin: {
    linkUrl: '/register',
    linkText: "Don't have an account?",
    header: 'Welcome Back',
    subheader: 'Enter your credentials to access your account',
    buttonText: 'Sign In',
  },
} as const;

type AuthFormProps = {
  mode: keyof typeof texts;
};

type Inputs = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export const AuthForm = ({ mode }: AuthFormProps) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Inputs>();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      setIsSubmitting(true);

      const res =
        mode === 'register' ? await register(data) : await signin(data);

      dispatch(setUser(res.data.user));

      router.replace('/home');
    } catch (error: any) {
      setError(error?.message ?? 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = texts[mode];

  return (
    <Card title={content.header} className="w-full max-w-md">
      <p className="text-sm text-gray-500 mb-2">{content.subheader}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {mode === 'register' && (
          <div className="flex justify-between gap-4">
            <div>
              <Input
                register={formRegister}
                required
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Awesome"
                label="First name"
              />
              {errors.firstName && (
                <ErrorMessage>{errors.firstName.message}</ErrorMessage>
              )}
            </div>
            <div>
              <Input
                register={formRegister}
                required
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Silver"
                label="Last name"
              />
              {errors.lastName && (
                <ErrorMessage>{errors.lastName.message}</ErrorMessage>
              )}
            </div>
          </div>
        )}
        <div>
          <Input
            register={formRegister}
            required
            id="email"
            name="email"
            type="email"
            placeholder="me@email.com"
            label="Email"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div>
          <Input
            register={formRegister}
            required
            id="password"
            name="password"
            type="password"
            placeholder="******"
            label="Password"
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <div className="flex items-center flex-col gap-4 mt-4 justify-between">
          <Button
            type="submit"
            loading={isSubmitting}
            variant="primary"
            disabled={isSubmitting || !isDirty}
          >
            {content.buttonText}
          </Button>
          {error && (
            <ErrorMessage className="justify-center">{error}</ErrorMessage>
          )}
          <div>
            <span>
              <Link href={content.linkUrl} className="text-secondary font-bold">
                {content.linkText}
              </Link>
            </span>
          </div>
        </div>
      </form>
    </Card>
  );
};
