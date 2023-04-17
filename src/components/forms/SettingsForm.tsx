import { Settings, Theme } from '@prisma/client';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Range } from '../ui/Range';

export type SettingsFormData = {
  language: string;
  maxTokens: string;
  temperature: string;
  theme: Theme;
};
export type SettingsFormProps = {
  defaultValues?: SettingsFormData;
  onSubmit: (data: SettingsFormData) => Promise<void>;
  onSuccess?: () => void;
};
export const SettingsForm = ({
  defaultValues,
  onSubmit,
  onSuccess,
}: SettingsFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<SettingsFormData>({
    defaultValues,
  });

  const submitHandler: SubmitHandler<SettingsFormData> = async data => {
    try {
      setIsSubmitting(true);

      await onSubmit(data);
      reset();
      clearErrors();
      onSuccess?.();
    } catch (error: any) {
      setError(error?.message ?? 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex w-full gap-6">
          <div className="flex-1">
            <Input
              register={register}
              id="language"
              name="language"
              type="text"
              label="Language"
              disabled
            ></Input>
            {errors.language && (
              <ErrorMessage>{errors.language.message}</ErrorMessage>
            )}
          </div>

          <div className="flex-1">
            <Select
              {...register('theme', { required: true })}
              title="Type"
              label="Type"
              id="type"
              options={Object.values(Theme).map(type => ({
                value: type,
                label: type.toLowerCase(),
              }))}
            ></Select>
          </div>
        </div>

        <div className="flex w-full gap-6">
          <div className="flex-1">
            <Range
              register={register}
              id="maxTokens"
              name="maxTokens"
              min={2000}
              max={4000}
              label="Max Tokens"
              color="secondary"
            />
            {errors.maxTokens && (
              <ErrorMessage>{errors.maxTokens.message}</ErrorMessage>
            )}
          </div>

          <div className="flex-1">
            <Range
              register={register}
              id="temperature"
              name="temperature"
              min={0.1}
              max={2}
              step={0.1}
              color="secondary"
              label="Temperature"
            />
            {errors.temperature && (
              <ErrorMessage>{errors.temperature.message}</ErrorMessage>
            )}
          </div>
        </div>

        <div className="flex w-full justify-center mt-6">
          <Button
            type="submit"
            variant="primary"
            className="m-w-28"
            disabled={isSubmitting || !isDirty}
            loading={isSubmitting}
          >
            Save
          </Button>
        </div>
      </form>
      {error && <ErrorMessage className="justify-center">{error}</ErrorMessage>}
    </div>
  );
};
