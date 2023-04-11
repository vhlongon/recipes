'use client';

import { deleteRecipe, updateRecipe } from '@/lib/api';
import { Recipe } from '@prisma/client';
import { useState } from 'react';
import { Button } from './Button';
import { useEditDeleteContext } from './EditDeleteModal';
import { ErrorMessage } from './ErrorMessage';
import { Modal } from './Modal';
import { FormData, RecipeForm } from './RecipeForm';

type EditDeleteRecipeProps = {
  recipe: Omit<Recipe, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
  };
};

type Action = 'edit' | 'delete' | null;

export const EditDeleteRecipe = ({ recipe }: EditDeleteRecipeProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isOpen, action, closeModal, onSuccess } = useEditDeleteContext();

  const defaultValues = {
    title: recipe.title,
    description: recipe.description ?? '',
    type: recipe.type,
    ingredients: recipe.ingredients,
    portions: recipe.portions.toString(),
    kcal: recipe.kcal.toString(),
    preparationTime: recipe.preparationTime.toString(),
  };

  const onRecipeDelete = async () => {
    try {
      setIsSubmitting(true);
      await deleteRecipe(recipe.id);
      onSuccess();
    } catch (error: any) {
      setError(error?.message ?? 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRecipeUpdate = async (formData: FormData) => {
    await updateRecipe({ id: recipe.id, ...formData });
  };

  return (
    <div>
      <Modal isOpen={isOpen} handleClose={closeModal}>
        {action === 'edit' ? (
          <RecipeForm
            mode="edit"
            onSubmit={onRecipeUpdate}
            defaultValues={defaultValues}
            onSucess={onSuccess}
          />
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="text-center text-xl text-gray-600">
              Are you sure you want to delete this recipe?
            </p>
            <Button
              variant="secondary"
              type="button"
              loading={isSubmitting}
              onClick={onRecipeDelete}
            >
              Yes, delete
            </Button>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </div>
        )}
      </Modal>
    </div>
  );
};
