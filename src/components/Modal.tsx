'use client';

import clsx from 'clsx';
import React from 'react';
import { XCircle } from 'react-feather';
import { Button } from './Button';
import { ReactPortal } from './ReactPortal';

type ModalProps = {
  children: React.ReactNode;
  isOpen?: boolean;
  handleClose?: () => void;
};
export const Modal = ({ children, isOpen, handleClose }: ModalProps) => {
  return (
    <ReactPortal wrapperId="modal-root">
      <div className={clsx('modal', isOpen && 'modal-open')}>
        <div className="modal-box bg-slate-100 relative">
          <Button
            onClick={handleClose}
            variant="ghost"
            circle
            className="absolute right-2 top-2"
          >
            <XCircle size="1.5rem" />
          </Button>
          <div className="pt-6">{children}</div>
        </div>
      </div>
    </ReactPortal>
  );
};
