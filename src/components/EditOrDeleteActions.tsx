'use client';

import { Recipe } from '@prisma/client';
import { useState } from 'react';
import { Edit, X } from 'react-feather';
import { Button } from './Button';
import { Modal } from './Modal';
import { FormData, RecipeForm } from './RecipeForm';

type EditOrDeleteActionsProps = {
  recipe: Recipe;
};

type Action = 'edit' | 'delete' | null;

export const EditOrDeleteActions = ({ recipe }: EditOrDeleteActionsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<Action>(null);

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

  const onDelete = async () => {
    // TODO: create api handler to delete recipe
    console.log(`delete recipe: ${recipe.id}}`);
    closeModal();
  };

  const onSubmit = async (formData: FormData) => {
    //TODO create api handler to update recipe
    console.log(formData);
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
          />
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
      </Modal>
    </div>
  );
};
