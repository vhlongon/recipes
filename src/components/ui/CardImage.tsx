'use client';
import Image from 'next/image';
import React, { ReactEventHandler } from 'react';

type CardImageProps =
  | { src: string; alt?: string; width: number; height: number }
  | { src: string; alt?: string; fill: true };

export const CardImage = ({ src, alt, ...rest }: CardImageProps) => {
  const addImageFallback: ReactEventHandler<HTMLImageElement> = event => {
    event.currentTarget.src = '/recipe-image-placeholder.jpg';
  };

  const isFill = 'fill' in rest;
  const width = isFill ? undefined : rest.width;
  const height = isFill ? undefined : rest.height;

  return (
    <figure className="relative aspect-video w-full overflow-hidden">
      <Image
        src={src}
        fill={isFill}
        width={width}
        height={height}
        className="w-full object-cover"
        alt={alt ?? 'description'}
        onError={addImageFallback}
      />
    </figure>
  );
};
