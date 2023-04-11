'use client';

import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Edit, X } from 'react-feather';
import { Button } from './Button';
import { UserProfileForm, FormData } from './UserProfileForm';
import { Modal } from './Modal';
import { ErrorMessage } from './ErrorMessage';

type EditDeleteUserActionsProps = {
  user: Omit<User, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
  };
};

type Action = 'edit' | 'delete' | null;

export const EditDeleteUserActions = ({ user }: EditDeleteUserActionsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<Action>(null);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
    image: user.image,
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
      // TODO handle user deletion
      onSuccess();
    } catch (error: any) {
      setError(error?.message ?? 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (formData: FormData) => {
    // TODO handle user update
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
      <Modal id="edit-user-modal" isOpen={isModalOpen} handleClose={closeModal}>
        {action === 'edit' ? (
          <UserProfileForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            onSucess={onSuccess}
          />
        ) : (
          <div className="flex flex-col gap-4 items-center justify-center">
            <p className="text-center text-xl text-gray-600">
              Are you sure you want to delete your account?
            </p>
            <Button
              variant="secondary"
              type="button"
              loading={isSubmitting}
              onClick={onDelete}
            >
              Yes, delete me
            </Button>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </div>
        )}
      </Modal>
    </div>
  );
};
