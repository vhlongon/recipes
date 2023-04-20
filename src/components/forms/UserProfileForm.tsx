'use client';

import { getErrorMessage } from '@/lib/utils';
import { useUserSlice } from '@/store/stateHooks';
import { User } from '@prisma/client';
import { useState } from 'react';
import { Edit3, Image as ImageIcon, Mail } from 'react-feather';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/ErrorMessage';
import { FileInput } from '../ui/FileInput';
import { Input } from '../ui/Input';

export type FormData = Pick<User, 'email' | 'firstName' | 'lastName' | 'image'>;

const convertImageToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

type RecipeFormProps = {
  defaultValues?: FormData;
  onSubmit: (data: FormData) => Promise<void>;
  onSuccess?: () => void;
};

export const UserProfileForm = ({ defaultValues, onSubmit, onSuccess }: RecipeFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser } = useUserSlice();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    defaultValues,
  });

  const submitHandler: SubmitHandler<FormData> = async data => {
    try {
      setIsSubmitting(true);
      const { image, ...rest } = data;
      const file = (image as unknown as FileList)?.[0];
      const imageBase64 = file ? await convertImageToBase64(file) : null;

      const input = {
        image: imageBase64,
        ...rest,
      };

      await onSubmit(input);
      setUser(input);
      reset();
      clearErrors();
      onSuccess?.();
    } catch (error: unknown) {
      setError(getErrorMessage(error) || 'Something went wrong trying to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-2">
        <div>
          <Input
            register={register}
            id="firstName"
            name="firstName"
            type="text"
            label={
              <span className="flex items-center gap-2 text-base-content">
                <Edit3 size="1rem" />
                First name
              </span>
            }
          />
          {errors.firstName && <ErrorMessage>{errors.firstName.message}</ErrorMessage>}
        </div>

        <div>
          <Input
            register={register}
            id="lastName"
            name="lastName"
            type="text"
            label={
              <span className="flex items-center gap-2 text-base-content">
                <Edit3 size="1rem" />
                Last name
              </span>
            }
          />
          {errors.lastName && <ErrorMessage>{errors.lastName.message}</ErrorMessage>}
        </div>

        <div>
          <Input
            register={register}
            id="email"
            name="email"
            type="email"
            label={
              <span className="flex items-center gap-2 text-base-content">
                <Mail size="1rem" />
                Email
              </span>
            }
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div>
          <FileInput
            register={register}
            id="image"
            name="image"
            label={
              <span className="flex items-center gap-2 text-base-content">
                <ImageIcon size="1rem" />
                Profile image
              </span>
            }
          />
          {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
        </div>

        <div className="mt-4 flex flex-col items-center justify-between gap-4">
          <Button type="submit" loading={isSubmitting} variant="primary" disabled={isSubmitting || !isDirty}>
            Update
          </Button>
          {error && <ErrorMessage className="justify-center">{error}</ErrorMessage>}
        </div>
      </form>
    </div>
  );
};
