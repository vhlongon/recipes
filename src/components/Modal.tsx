import clsx from 'clsx';
import React from 'react';
import { XCircle } from 'react-feather';
import { ReactPortal } from './ReactPortal';

type ModalProps = {
  children: React.ReactNode;
  id: string;
  isOpen?: boolean;
  handleClose?: () => void;
};
export const Modal = ({ children, id, isOpen, handleClose }: ModalProps) => {
  return (
    <ReactPortal wrapperId="modal-root">
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className={clsx('modal', isOpen && 'model-open')}>
        <div className="modal-box relative">
          <label
            htmlFor={id}
            onClick={handleClose}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <XCircle size="1rem" />
          </label>
          {children}
        </div>
      </div>
    </ReactPortal>
  );
};
