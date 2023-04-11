'use client';

import { User } from '@prisma/client';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';
import { Input } from './Input';
import { Button } from './Button';

export type FormData = Pick<User, 'email' | 'firstName' | 'lastName' | 'image'>;

type RecipeFormProps = {
  defaultValues?: FormData;
  onSubmit: (data: FormData) => Promise<void>;
  onSucess?: () => void;
};

export const UserProfileForm = ({
  defaultValues,
  onSubmit,
  onSucess,
}: RecipeFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
  });
  const submitHandler: SubmitHandler<FormData> = async data => {
    console.log(data);

    try {
      await onSubmit(data);
      reset();
      clearErrors();
      onSucess?.();
    } catch (error: any) {
      setError(error?.message ?? 'Something went wrong');
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-2"
      >
        <div>
          <Input
            register={register}
            required
            id="firstName"
            name="firstName"
            type="text"
            placeholder="FirstName"
            label="FirstName"
          />
          {errors.firstName && (
            <ErrorMessage>{errors.firstName.message}</ErrorMessage>
          )}
        </div>

        <div>
          <Input
            register={register}
            required
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Lastname"
            label="Lastname"
          />
          {errors.lastName && (
            <ErrorMessage>{errors.lastName.message}</ErrorMessage>
          )}
        </div>

        <div>
          <Input
            register={register}
            required
            id="email"
            name="email"
            type="email"
            placeholder="me@email.com"
            label="Email"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex items-center flex-col gap-4 mt-4 justify-between">
          <Button type="submit" loading={isSubmitting} variant="primary">
            Update
          </Button>
          {error && (
            <ErrorMessage className="justify-center">{error}</ErrorMessage>
          )}
        </div>
      </form>
    </div>
  );
};
