'use client';

import React, { useState } from 'react';
import { Edit, X } from 'react-feather';
import { Button } from './Button';
import { Recipe, RecipeType } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';
import { Input } from './Input';
import { Modal } from './Modal';
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

type EditOrDeleteActionsProps = {
  recipe: Recipe;
};

type Action = 'edit' | 'delete' | null;

export const EditOrDeleteActions = ({ recipe }: EditOrDeleteActionsProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<Action>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      title: recipe.title,
      description: recipe.description ?? '',
      type: recipe.type,
      ingredients: recipe.ingredients,
      portions: recipe.portions.toString(),
      kcal: recipe.kcal.toString(),
      preparationTime: recipe.preparationTime.toString(),
    },
  });

  const openModal = (action: Action) => () => {
    setAction(action);
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
      description: data.description,
      type: data.type,
      ingredients: data.ingredients,
      portions: Number(data.portions),
      kcal: Number(data.kcal),
      preparationTime: Number(data.preparationTime),
    };

    // TODO: Add loading state

    try {
      //TODO create api handler to update recipe
      console.log(input);

      // closeModal();
      // router.refresh();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const onDelete = async () => {
    // TODO: Add handle deletion of recipe
    console.log('delete');
    closeModal();
  };

  return (
    <div>
      {!isModalOpen && (
        <div className="flex w-full justify-end relative gap-4">
          <div className="flex flex-col gap-1 items-center">
            <Button variant="primary" square onClick={openModal('edit')}>
              <Edit />
            </Button>
            <span className="text-slate-400 text-sm">Edit</span>
          </div>
          <div className="flex flex-col gap-1 items-center">
            <Button variant="secondary" square onClick={openModal('delete')}>
              <X />
            </Button>
            <span className="text-slate-400 text-sm">Delete</span>
          </div>
        </div>
      )}
      <Modal
        id="edit-recipe-modal"
        isOpen={isModalOpen}
        handleClose={closeModal}
      >
        {action === 'edit' ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
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
                  const { onChange, value, name, onBlur } = field;
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
              title="Edit recipe"
              variant="primary"
              className="w-28 self-center mt-2"
            >
              Update
            </Button>
          </form>
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="text-center text-xl text-gray-600">
              Are you sure you want to delete this recipe?
            </p>
            <Button variant="secondary" type="button" onClick={onDelete}>
              Delete
            </Button>
          </div>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Modal>
    </div>
  );
};
