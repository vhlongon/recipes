'use client';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { UserInput, register, signin } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

export const AuthForm = ({ mode }: AuthFormProps) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = Object.fromEntries(
      new FormData(e.currentTarget).entries()
    ) as UserInput;

    try {
      if (mode === 'register') {
        await register(formData);
      } else {
        await signin(formData);
      }
      router.replace('/home');
    } catch (error: any) {
      setError(error?.message ?? 'Something went wrong');
    }
  };

  const content = texts[mode];

  return (
    <Card className="w-80">
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="me@email.com"
          label="Email"
        />
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="******"
          label="Password"
        />
        {mode === 'register' && (
          <>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Awesome"
              label="First name"
            />
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Silver"
              label="Last name"
            />
          </>
        )}
        <div className="flex items-center flex-col gap-4 mt-4 justify-between">
          <Button type="submit" variant="secondary">
            {content.buttonText}
          </Button>
          {error && <p className="text-error">{error}</p>}
          <div>
            <span>
              <Link href={content.linkUrl} className="text-accent font-bold">
                {content.linkText}
              </Link>
            </span>
          </div>
        </div>
      </form>
    </Card>
  );
};
