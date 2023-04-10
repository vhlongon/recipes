'use client';

import { Recipe, RecipeType } from '@prisma/client';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from './Button';
import { ErrorMessage } from './ErrorMessage';
import { Input } from './Input';
import { Select } from './Select';
import { TagInput } from './TagInput';

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
  | 'title'
  | 'description'
  | 'type'
  | 'ingredients'
  | 'portions'
  | 'kcal'
  | 'preparationTime'
>;

export const RecipeForm = ({
  defaultValues,
  onSubmit,
  onSucess,
  mode,
}: RecipeFormProps) => {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    clearErrors,
    formState: { errors },
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
      await onSubmit(input);
      reset();
      clearErrors();
      onSucess?.();
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submiHandler)}
        className="flex flex-col gap-2"
      >
        <div className="flex gap-4 w-full justify-between">
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
            {errors.title && (
              <ErrorMessage>{errors.title.message}</ErrorMessage>
            )}
          </div>
          <div>
            <Select
              {...register('type', { required: true })}
              title="Type"
              label="Type"
              id="type"
              options={Object.values(RecipeType).map(type => ({
                value: type,
              }))}
            ></Select>
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
            {errors.description && (
              <ErrorMessage>{errors.description.message}</ErrorMessage>
            )}
          </div>
        )}

        <div>
          <Controller
            render={({ field }) => {
              const { onChange, ref, value, name, onBlur } = field;
              const handleChange = (value: string[]) => {
                onChange(value);
              };
              return (
                <TagInput
                  label="Ingredients"
                  onChange={handleChange}
                  tags={value}
                  name={name}
                  onBlur={onBlur}
                />
              );
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
          {errors.ingredients && (
            <ErrorMessage>{errors.ingredients.message}</ErrorMessage>
          )}
        </div>
        <div className="flex gap-4 w-full justify-between">
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
            {errors.portions && (
              <ErrorMessage>{errors.portions.message}</ErrorMessage>
            )}
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
            {errors.preparationTime && (
              <ErrorMessage>{errors.preparationTime.message}</ErrorMessage>
            )}
          </div>
        </div>
        <Button
          type="submit"
          variant="primary"
          className="w-28 self-center mt-2"
        >
          {mode === 'edit' ? 'Edit' : 'Create'}
        </Button>
      </form>
      {error && <ErrorMessage className="justify-center">{error}</ErrorMessage>}
    </div>
  );
};
