'use client';

import { createRecipe, generateRecipe } from '@/lib/api';
import { RecipeType } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PlusCircle } from 'react-feather';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from './Button';
import { ErrorMessage } from './ErrorMessage';
import { Input } from './Input';
import { Modal } from './Modal';
import { Select } from './Select';
import { TagInput } from './TagInput';

type CreateRecipeProps = {
  className?: string;
  mode: 'manual' | 'auto';
};

type Inputs = {
  title: string;
  type: RecipeType;
  ingredients: string[];
  portions: string;
  kcal: string;
  preparationTime: string;
  description: string;
};

export const CreateRecipe = ({ className, mode }: CreateRecipeProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>();

  const openModal = () => {
    reset();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    clearErrors();
    reset();
  };

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const input = {
      title: data.title,
      description: data.description ?? '',
      type: data.type,
      ingredients: data.ingredients,
      portions: Number(data.portions),
      kcal: Number(data.kcal),
      preparationTime: Number(data.preparationTime),
    };

    // TODO: Add loading state
    try {
      if (mode === 'manual') {
        await createRecipe(input);
      } else {
        const { data } = await generateRecipe(input);
        await createRecipe(data);
      }

      closeModal();
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className={className}>
      <Button variant="primary" className="w-48 flex gap-4" onClick={openModal}>
        <span>New Recipe</span>
        <PlusCircle />
      </Button>
      <Modal
        id="new-recipe-modal"
        isOpen={isModalOpen}
        handleClose={closeModal}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
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

          {mode === 'manual' && (
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
              {errors.kcal && (
                <ErrorMessage>{errors.kcal.message}</ErrorMessage>
              )}
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
            Send
          </Button>
        </form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Modal>
    </div>
  );
};
