'use client';
import React, { ReactEventHandler } from 'react';

export const CardImage = ({ src, alt }: { src: string; alt?: string }) => {
  const addImageFallback: ReactEventHandler<HTMLImageElement> = event => {
    event.currentTarget.src = '/recipe-image-placeholder.jpg';
  };
  return (
    <figure className="w-full aspect-video relative overflow-hidden">
      <img
        src={src}
        className="object-cover w-full"
        alt={alt}
        onError={addImageFallback}
      />
    </figure>
  );
};
