'use client';

import { protect } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Lock } from 'react-feather';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProfileImage } from '../layout/ProfileImage';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Input } from '../ui/Input';

type Inputs = {
  password: string;
};

export const ProtectForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      setIsSubmitting(true);
      await protect(data.password);
      router.replace('/home');
    } catch (error: any) {
      setError(error?.message ?? 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      title={
        <span className="flex justify-center gap-2">
          <Lock />
          Secure
        </span>
      }
      className="w-full max-w-md">
      <p className="mb-2 text-sm text-gray-500">Provide password to access the app</p>

      <div className="my-2 flex w-full justify-center">
        <ProfileImage src={'/logo2.png'} alt="Logo" variant="hexagon" size="xl" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input register={register} name="password" id="password" type="password" />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>
        <div className="mt-4 flex flex-col items-center justify-between gap-4">
          <Button type="submit" loading={isSubmitting}>
            Submit
          </Button>
        </div>
        {error && <ErrorMessage className="justify-center">{error}</ErrorMessage>}
      </form>
    </Card>
  );
};
