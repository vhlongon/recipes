import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';

const profileImageClasses = cva(['mask', 'relative'], {
  variants: {
    variant: {
      squircle: ['mask-squircle'],
      heart: ['mask-heart'],
      hexagon: ['mask-hexagon'],
      hexagon2: ['mask-hexagon-2'],
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
      xl: ['w-48', 'h-48'],
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'hexagon',
  },
});

type ProfileImageProps = {
  src?: string;
  alt?: string;
} & VariantProps<typeof profileImageClasses>;

export const ProfileImage = ({ src, variant, size, alt }: ProfileImageProps) => {
  const className = profileImageClasses({ variant, size });
  return (
    <div className={className}>
      <Image
        sizes="100vw"
        className="object-cover"
        fill
        src={src || '/profile-placeholder.jpg'}
        alt={alt || 'profile image'}
      />
    </div>
  );
};
