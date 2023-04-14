'use client';

import React, {
  ReactElement,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { EditDeleteActions } from './EditDeleteActions';

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
  const [showChild, setShowChild] = useState(false);
  const [action, setAction] = useState<Action>(null);
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const value = useMemo(
    () => ({ action, setAction, isOpen, closeModal, openModal }),
    [action, closeModal, isOpen, openModal]
  );

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  return (
    <EditDeleteContext.Provider value={value}>
      <EditDeleteActions />
      {children}
    </EditDeleteContext.Provider>
  );
};
