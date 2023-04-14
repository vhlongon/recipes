'use client';

import { createRecipe, generateRecipe } from '@/lib/api';
import { useEffect, useState } from 'react';
import { PlusCircle } from 'react-feather';
import { FormData, RecipeForm } from '../forms/RecipeForm';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

type CreateRecipeProps = {
  className?: string;
};

export const CreateRecipe = ({ className }: CreateRecipeProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showChild, setShowChild] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSuccess = () => {
    closeModal();
  };

  const onSubmit = async (formData: FormData) => {
    const { data } = await generateRecipe(formData);
    await createRecipe(data);
  };

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <div className={className}>
      <Button variant="primary" className="w-48 flex gap-4" onClick={openModal}>
        <span>New Recipe</span>
        <PlusCircle />
      </Button>
      <Modal isOpen={isModalOpen} handleClose={closeModal}>
        <RecipeForm mode="create" onSubmit={onSubmit} onSucess={onSuccess} />
      </Modal>
    </div>
  );
};
