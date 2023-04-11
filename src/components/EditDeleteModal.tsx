'use client';

import React, {
  ReactElement,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { EditDeleteActions } from './EditDeleteActions';
import { useRouter } from 'next/navigation';

type EditDeleteModalProps = {
  children: ReactElement;
  isOpen?: boolean;
};

export type Action = 'edit' | 'delete' | null;

type EditDeleteContextProps = {
  action: Action;
  setAction: (action: Action) => void;
  isOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
  onSuccess: () => void;
};

const EditDeleteContext = createContext<EditDeleteContextProps | null>(null);

export const useEditDeleteContext = () => {
  const context = React.useContext(EditDeleteContext);

  if (!context) {
    throw new Error(
      'useEditDeleteContext must be used within a EditDeleteProvider'
    );
  }

  return context;
};

export const EditOrDeleteModal = ({
  children,
  isOpen: initialIsOpen = false,
}: EditDeleteModalProps) => {
  const [action, setAction] = useState<Action>(null);
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const { refresh } = useRouter();

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onSuccess = useCallback(() => {
    closeModal();
    refresh();
  }, [closeModal, refresh]);

  const value = useMemo(
    () => ({ action, setAction, isOpen, closeModal, openModal, onSuccess }),
    [action, closeModal, isOpen, onSuccess, openModal]
  );

  return (
    <EditDeleteContext.Provider value={value}>
      <EditDeleteActions />
      {children}
    </EditDeleteContext.Provider>
  );
};
