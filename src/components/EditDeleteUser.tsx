'use client';

import { User } from '@prisma/client';
import { useState } from 'react';
import { Button } from './Button';
import { useEditDeleteContext } from './EditDeleteModal';
import { ErrorMessage } from './ErrorMessage';
import { Modal } from './Modal';
import { FormData, UserProfileForm } from './UserProfileForm';

type EditDeleteUserProps = {
  user: Omit<User, 'createdAt' | 'updatedAt'> & {
    createdAt: string;
    updatedAt: string;
  };
};

export const EditDeleteUser = ({ user }: EditDeleteUserProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isOpen, action, closeModal, onSuccess } = useEditDeleteContext();

  const defaultValues = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
    image: user.image,
  };

  const onUserDelete = async () => {
    try {
      setIsSubmitting(true);
      // TODO handle user deletion
      console.log(`deleting user ${user.id}`);
      onSuccess();
    } catch (error: any) {
      setError(error?.message ?? 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onUserUpdate = async (formData: FormData) => {
    // TODO handle user update
    console.log(formData);
  };

  return (
    <Modal isOpen={isOpen} handleClose={closeModal}>
      {action === 'edit' ? (
        <UserProfileForm
          onSubmit={onUserUpdate}
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
            onClick={onUserDelete}
          >
            Yes, delete me
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
      )}
    </Modal>
  );
};
