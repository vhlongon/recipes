import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';

const profileImageClasses = cva(['mask', 'relative'], {
  variants: {
    variant: {
      squircle: ['mask-squircle'],
      heart: ['mask-heart'],
      hexagon: ['mask-hexagon'],
      hexagon2: ['mask-hexagon2'],
      decagon: ['mask-decagon'],
      pentagon: ['mask-pentagon'],
      diamond: ['mask-diamond'],
      square: ['mask-square'],
      circle: ['mask-circle'],
      parallelogram: ['mask-parallelogram'],
      star: ['mask-star'],
      triangle: ['mask-triangle'],
    },
    size: {
      xs: ['w-8', 'h-8'],
      sm: ['w-12', 'h-12'],
      md: ['w-24', 'h-24'],
      lg: ['w-36', 'h-36'],
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'hexagon',
  },
});

type ProfileImageProps = {
  src?: string;
} & VariantProps<typeof profileImageClasses>;

export const ProfileImage = ({ src, variant, size }: ProfileImageProps) => {
  const className = profileImageClasses({ variant, size });
  return (
    <div className={className}>
      <Image
        sizes="100vw"
        fill
        src={src || '/profile-placeholder.jpg'}
        alt="profile image"
      />
    </div>
  );
};
