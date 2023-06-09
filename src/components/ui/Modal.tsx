'use client';

import clsx from 'clsx';
import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { XCircle } from 'react-feather';
import { Button } from './Button';

type PortalProps = {
  children: React.ReactNode;
  wrapperId: string;
};

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute('id', wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
};

export const ReactPortal = ({ children, wrapperId }: PortalProps) => {
  const [wrapperElement, setWrapperElement] = useState<null | HTMLElement>(null);

  useLayoutEffect(() => {
    let element = document.getElementById('modal-root');
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperId);
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperId]);

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) {
    return null;
  }

  return createPortal(children, wrapperElement);
};

type ModalProps = {
  children: React.ReactNode;
  isOpen?: boolean;
  handleClose?: () => void;
};
export const Modal = ({ children, isOpen, handleClose }: ModalProps) => {
  const style = { '--scrollbar-secondary': 'hsl(var(--p) / 1)' } as React.CSSProperties;
  return (
    <ReactPortal wrapperId="modal-root">
      <div className={clsx('modal', isOpen && 'modal-open')}>
        <div className="modal-box relative" style={style}>
          <Button onClick={handleClose} variant="ghost" circle className="absolute right-4 top-4">
            <XCircle size="1.5rem" />
          </Button>
          <div className="pt-8">{children}</div>
        </div>
      </div>
    </ReactPortal>
  );
};
