import Image from 'next/image';
import React from 'react';

type ProfileImageProps = {
  src?: string;
};

export const ProfileImage = ({ src }: ProfileImageProps) => {
  return (
    <div className="w-24 mask mask-hexagon">
      <Image
        width={256}
        height={256}
        src={src || '/profile-placeholder.jpg'}
        alt="profile image"
      />
    </div>
  );
};
