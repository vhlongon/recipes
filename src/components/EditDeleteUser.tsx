'use client';

import { deleteUser, updateUser } from '@/lib/api';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const { isOpen, action, closeModal } = useEditDeleteContext();

  const defaultValues = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt,
    image: null,
  };

  const onUserDelete = async () => {
    try {
      setIsSubmitting(true);
      await deleteUser();
      closeModal();
      router.replace('/signin');
    } catch (error: any) {
      setError(error?.message ?? 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onUserUpdate = async (formData: FormData) => {
    await updateUser(formData);
  };

  const onSuccess = () => {
    closeModal();
    router.refresh();
  };

  return (
    <Modal isOpen={isOpen} handleClose={closeModal}>
      {action === 'edit' ? (
        <UserProfileForm
          onSubmit={onUserUpdate}
          defaultValues={defaultValues}
          onSuccess={onSuccess}
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
