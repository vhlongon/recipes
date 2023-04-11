'use client';

import { Recipe } from '@prisma/client';
import { useState } from 'react';
import { Edit, X } from 'react-feather';
import { Button } from './Button';
import { Modal } from './Modal';
import { FormData, RecipeForm } from './RecipeForm';
import { deleteRecipe, updateRecipe } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from './ErrorMessage';

type EditDeleteRecipeActionsProps = {
  recipe: Omit<Recipe, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
  };
};

type Action = 'edit' | 'delete' | null;

export const EditDeleteRecipeActions = ({
  recipe,
}: EditDeleteRecipeActionsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<Action>(null);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = {
    title: recipe.title,
    description: recipe.description ?? '',
    type: recipe.type,
    ingredients: recipe.ingredients,
    portions: recipe.portions.toString(),
    kcal: recipe.kcal.toString(),
    preparationTime: recipe.preparationTime.toString(),
  };

  const openModal = (action: Action) => () => {
    setAction(action);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSuccess = () => {
    closeModal();
    router.refresh();
  };

  const onDelete = async () => {
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

  const onSubmit = async (formData: FormData) => {
    await updateRecipe({ id: recipe.id, ...formData });
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
          <RecipeForm
            mode="edit"
            onSubmit={onSubmit}
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
              onClick={onDelete}
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
