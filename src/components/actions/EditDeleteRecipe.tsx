'use client';

import { deleteRecipe, updateRecipe } from '@/lib/api';
import { getErrorMessage } from '@/lib/utils';
import { Recipe } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormData, RecipeForm } from '../forms/RecipeForm';
import { Button } from '../ui/Button';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Modal } from '../ui/Modal';
import { useEditDeleteContext } from './EditDeleteModal';

type EditDeleteRecipeProps = {
  recipe: Omit<Recipe, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
  };
};

export const EditDeleteRecipe = ({ recipe }: EditDeleteRecipeProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { isOpen, action, closeModal } = useEditDeleteContext();

  const defaultValues = {
    title: recipe.title,
    description: recipe.description ?? '',
    type: recipe.type,
    ingredients: recipe.ingredients,
    portions: recipe.portions.toString(),
    kcal: recipe.kcal.toString(),
    preparationTime: recipe.preparationTime.toString(),
  };

  const onSuccess = () => {
    closeModal();
    router.refresh();
  };

  const onRecipeDelete = async () => {
    try {
      setIsSubmitting(true);
      await deleteRecipe(recipe.id);
      onSuccess();
    } catch (error: unknown) {
      setError(getErrorMessage(error) || 'Something went wrong trying to delete recipe');
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
          <RecipeForm mode="edit" onSubmit={onRecipeUpdate} defaultValues={defaultValues} onSucess={onSuccess} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-xl text-gray-600">Are you sure you want to delete this recipe?</p>
            <Button variant="secondary" type="button" loading={isSubmitting} onClick={onRecipeDelete}>
              Yes, delete
            </Button>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </div>
        )}
      </Modal>
    </div>
  );
};
