'use client';
import React, { ReactEventHandler } from 'react';

export const CardImage = ({ src, alt }: { src: string; alt?: string }) => {
  const addImageFallback: ReactEventHandler<HTMLImageElement> = event => {
    event.currentTarget.src = '/recipe-image-placeholder.jpg';
  };
  return (
    <figure className="relative aspect-video w-full overflow-hidden">
      <img src={src} className="w-full object-cover" alt={alt} onError={addImageFallback} />
    </figure>
  );
};
