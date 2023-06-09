'use client';

import { getErrorMessage } from '@/lib/utils';
import { Recipe, RecipeType } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Input } from '../ui/Input';
import { Progress } from '../ui/Progress';
import { Range } from '../ui/Range';
import { Select } from '../ui/Select';
import { TagInput } from '../ui/TagInput';
import { generateRecipeImage } from '@/lib/api';
import clsx from 'clsx';

type Inputs = {
  title: string;
  type: RecipeType;
  ingredients: string[];
  portions: string;
  kcal: string;
  preparationTime: string;
  description: string;
  image: string;
};

type RecipeFormProps = {
  defaultValues?: Inputs;
  onSubmit: (data: RecipeFormData) => Promise<void>;
  onSuccess?: () => void;
  mode: 'create' | 'edit';
};

export type RecipeFormData = Pick<
  Recipe,
  'title' | 'description' | 'type' | 'ingredients' | 'portions' | 'kcal' | 'preparationTime' | 'image'
>;

export const RecipeForm = ({ defaultValues, onSubmit, onSuccess, mode }: RecipeFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors, isDirty },
    getValues,
    watch,
    setValue,
  } = useForm<Inputs>({
    defaultValues,
  });

  const formValues = getValues();
  const currentIngredients = watch('ingredients');
  const currentDescription = watch('description');
  const currentImage = watch('image');
  const hasImagedChanged = currentImage !== defaultValues?.image;

  const submiHandler: SubmitHandler<Inputs> = async data => {
    const input = {
      title: data.title,
      description: data.description ?? '',
      type: data.type,
      ingredients: data.ingredients,
      portions: Number(data.portions),
      kcal: Number(data.kcal),
      preparationTime: Number(data.preparationTime),
      image: data.image,
    };

    try {
      setIsSubmitting(true);
      await onSubmit(input);
      clearErrors();
      onSuccess?.();
    } catch (error: unknown) {
      setError(getErrorMessage(error) || 'Something went wrong trying to update recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onGenerateImageClick = async () => {
    const input = {
      description: currentDescription,
      ingredients: currentIngredients,
    };

    try {
      setIsGeneratingImage(true);

      const response = await generateRecipeImage(input);
      setValue('image', response.data.image);
    } catch (error) {
      setError(getErrorMessage(error) || 'Something went wrong trying to generate new image');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const isSubmitDisabled = isSubmitting || (!isDirty && !hasImagedChanged) || isGeneratingImage;

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
              register={register}
              required
              name="type"
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
        <div className="mt-6 flex w-full justify-between gap-4">
          <div>
            <Range
              register={register}
              required
              color="secondary"
              id="portions"
              name="portions"
              initialValue={defaultValues?.portions}
              min={1}
              max={10}
              step={1}
              placeholder="2"
              label="portions"
            />
            {errors.portions && <ErrorMessage>{errors.portions.message}</ErrorMessage>}
          </div>
          <div>
            <Range
              register={register}
              required
              color="secondary"
              id="kcal"
              name="kcal"
              initialValue={defaultValues?.kcal}
              min={50}
              max={1000}
              step={50}
              placeholder="300"
              label="kcal"
            />
            {errors.kcal && <ErrorMessage>{errors.kcal.message}</ErrorMessage>}
          </div>
          <div>
            <Range
              register={register}
              required
              color="secondary"
              id="preparationTime"
              name="preparationTime"
              initialValue={defaultValues?.preparationTime}
              min={10}
              max={120}
              step={10}
              placeholder="30min"
              label="Prep time(min)"
            />
            {errors.preparationTime && <ErrorMessage>{errors.preparationTime.message}</ErrorMessage>}
          </div>
        </div>
        {mode !== 'create' && (
          <div className="flex flex-col gap-4 items-center mt-2">
            <div className="relative w-full aspect-video">
              {isGeneratingImage && (
                <div className="flex flex-col justify-center absolute items-center justify-items-center w-full h-full">
                  <Progress color="accent" className="z-10" />
                </div>
              )}
              <Image
                className={clsx(
                  'object-cover rounded-box border-2 border-accent border-solid',
                  isGeneratingImage && 'grayscale contrast-50'
                )}
                src={formValues.image || '/recipe-image-placeholder.jpg'}
                sizes="100vw"
                fill
                alt={defaultValues?.title || 'recipe'}
              />
            </div>

            <div className="flex flex-col gap-1 items-center justify-items-center">
              <Button
                className="max-w-xs"
                type="button"
                variant="accent"
                outline
                size="xs"
                disabled={isSubmitting || isGeneratingImage}
                onClick={onGenerateImageClick}>
                Generate new image
              </Button>
              <div className="flex gap-1 justify-items-center text-sm text-base-content">
                This uses
                <a className="link" href="https://replicate.com/" target="_blank">
                  Replicate
                </a>
                with
                <a className="link" href="https://replicate.com/ai-forever/kandinsky-2" target="_blank">
                  Kandisky-2 model
                </a>
                to generate images
              </div>
            </div>
          </div>
        )}
        <Button
          type="submit"
          variant="primary"
          className="m-w-28 mt-2 self-center"
          disabled={isSubmitDisabled}
          loading={isSubmitting}>
          {mode === 'edit' ? 'Save' : 'Create'}
        </Button>
      </form>
      {isSubmitting && (
        <div className="mt-2 flex w-full flex-col items-center gap-1 text-sm text-base-content">
          {`Hold your horses while we ${mode} your recipe`}
          <Progress />
        </div>
      )}
      {error && <ErrorMessage className="justify-center">{error}</ErrorMessage>}
    </div>
  );
};
