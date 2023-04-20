'use client';

import { Recipe, RecipeType } from '@prisma/client';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { TagInput } from '../ui/TagInput';
import { Progress } from '../ui/Progress';
import { useRouter } from 'next/navigation';
import { getErrorMessage } from '@/lib/utils';

type Inputs = {
  title: string;
  type: RecipeType;
  ingredients: string[];
  portions: string;
  kcal: string;
  preparationTime: string;
  description: string;
};

type RecipeFormProps = {
  defaultValues?: Inputs;
  onSubmit: (data: FormData) => Promise<void>;
  onSucess?: () => void;
  mode: 'create' | 'edit';
};

export type FormData = Pick<
  Recipe,
  'title' | 'description' | 'type' | 'ingredients' | 'portions' | 'kcal' | 'preparationTime'
>;

export const RecipeForm = ({ defaultValues, onSubmit, onSucess, mode }: RecipeFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<Inputs>({
    defaultValues,
  });

  const submiHandler: SubmitHandler<Inputs> = async data => {
    const input = {
      title: data.title,
      description: data.description ?? '',
      type: data.type,
      ingredients: data.ingredients,
      portions: Number(data.portions),
      kcal: Number(data.kcal),
      preparationTime: Number(data.preparationTime),
    };

    try {
      setIsSubmitting(true);
      await onSubmit(input);
      reset();
      clearErrors();
      onSucess?.();
      router.refresh();
    } catch (error: unknown) {
      setError(getErrorMessage(error) || 'Something went wrong trying to update recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submiHandler)} className="flex flex-col gap-2">
        <div className="flex w-full justify-between gap-4">
          <div>
            <Input
              register={register}
              required
              id="title"
              name="title"
              type="text"
              placeholder="Recipe title"
              label="Title"
            />
            {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
          </div>
          <div>
            <Select
              {...register('type', { required: true })}
              title="Type"
              label="Type"
              id="type"
              options={Object.values(RecipeType).map(type => ({
                value: type,
                label: type.toLowerCase(),
              }))}></Select>
          </div>
        </div>

        {mode === 'edit' && (
          <div>
            <Input
              register={register}
              required
              id="description"
              name="description"
              type="text"
              placeholder="Recipe description"
              label="Description"
            />
            {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
          </div>
        )}

        <div>
          <Controller
            render={({ field }) => {
              const { onChange, value, name, onBlur } = field;
              const handleChange = (value: string[]) => {
                onChange(value);
              };
              return <TagInput label="Ingredients" onChange={handleChange} tags={value} name={name} onBlur={onBlur} />;
            }}
            control={control}
            name="ingredients"
            defaultValue={[]}
            rules={{
              validate: value => {
                if (value.length === 0) {
                  return 'At least one ingredient is required';
                }
                return true;
              },
            }}
          />
          {errors.ingredients && <ErrorMessage>{errors.ingredients.message}</ErrorMessage>}
        </div>
        <div className="flex w-full justify-between gap-4">
          <div>
            <Input
              register={register}
              required
              id="portions"
              name="portions"
              type="number"
              min="1"
              max="10"
              placeholder="2"
              label="portions"
            />
            {errors.portions && <ErrorMessage>{errors.portions.message}</ErrorMessage>}
          </div>
          <div>
            <Input
              register={register}
              required
              id="kcal"
              name="kcal"
              type="number"
              min="80"
              max="1000"
              placeholder="300"
              label="kcal"
            />
            {errors.kcal && <ErrorMessage>{errors.kcal.message}</ErrorMessage>}
          </div>
          <div>
            <Input
              register={register}
              required
              id="preparationTime"
              name="preparationTime"
              type="number"
              min="5"
              max="120"
              placeholder="30min"
              label="Prep time"
            />
            {errors.preparationTime && <ErrorMessage>{errors.preparationTime.message}</ErrorMessage>}
          </div>
        </div>
        <Button
          type="submit"
          variant="primary"
          className="m-w-28 mt-2 self-center"
          disabled={isSubmitting || !isDirty}
          loading={isSubmitting}>
          {mode === 'edit' ? 'Edit' : 'Create'}
        </Button>
      </form>
      {isSubmitting && (
        <div className="mt-2 flex w-full flex-col items-center gap-1 text-sm text-gray-500">
          {`Hold your horses while we ${mode} your recipe`}
          <Progress />
        </div>
      )}
      {error && <ErrorMessage className="justify-center">{error}</ErrorMessage>}
    </div>
  );
};
