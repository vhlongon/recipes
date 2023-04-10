'use client';

import { createRecipe, generateRecipe } from '@/lib/api';
import { useState } from 'react';
import { PlusCircle } from 'react-feather';
import { Button } from './Button';
import { Modal } from './Modal';
import { FormData, RecipeForm } from './RecipeForm';
import { useRouter } from 'next/navigation';

type CreateRecipeProps = {
  className?: string;
};

export const CreateRecipe = ({ className }: CreateRecipeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userRouter = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSuccess = () => {
    closeModal();
    userRouter.refresh();
  };

  const onSubmit = async (formData: FormData) => {
    const { data } = await generateRecipe(formData);
    await createRecipe(data);
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
        <RecipeForm mode="create" onSubmit={onSubmit} onSucess={onSuccess} />
      </Modal>
    </div>
  );
};
