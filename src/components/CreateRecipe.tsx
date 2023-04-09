'use client';

import { createRecipe } from '@/lib/api';
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
};

type Inputs = {
  title: string;
  description: string;
  type: RecipeType;
  ingredients: string[];
  portions: string;
  kcal: string;
  preparationTime: string;
};

export const CreateRecipe = ({ className }: CreateRecipeProps) => {
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
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    clearErrors();
  };

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      await createRecipe({
        title: data.title,
        description: data.description,
        type: data.type,
        ingredients: data.ingredients,
        portions: Number(data.portions),
        kcal: Number(data.kcal),
        preparationTime: Number(data.preparationTime),
      });

      setIsModalOpen(false);
      reset();
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
          <div>
            <Controller
              render={({ field }) => {
                const { onChange, ...rest } = field;
                const handleChange = (value: string[]) => {
                  onChange(value);
                };
                return (
                  <TagInput
                    label="Ingredients"
                    onChange={handleChange}
                    {...rest}
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
            variant="secondary"
            className="w-28 self-center mt-2"
          >
            Send
          </Button>
        </form>
        {error && <div className="text-red-500">{error}</div>}
      </Modal>
    </div>
  );
};
