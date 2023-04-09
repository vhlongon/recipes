'use client';

import React from 'react';
import { Modal } from './Modal';

export const CreateRecipe = () => {
  return (
    <>
      <label htmlFor="new-recipe-modal" className="btn btn-accent">
        New Recipe
      </label>
      <Modal id="new-recipe-modal">Hello</Modal>
    </>
  );
};
