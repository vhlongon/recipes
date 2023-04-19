'use client';
import {
  FacebookShareButton,
  InstapaperShareButton,
  TwitterShareButton,
} from 'next-share';
import { usePathname } from 'next/navigation';
import { Facebook, Instagram, Twitter } from 'react-feather';

type ShareProps = {
  title: string;
  description: string;
  hashtags: string[];
  url?: string;
};
export const ShareRecipe = ({
  title,
  url,
  description,
  hashtags,
}: ShareProps) => {
  const pathname = usePathname();
  const originUrl = window.location.origin;
  const shareUrl = url || `${originUrl}${pathname}`;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <FacebookShareButton
          url={shareUrl}
          quote={description}
          hashtag={hashtags.join(', ')}
        >
          <div className="btn btn-circle btn-accent text-">
            <Facebook size={'1.5rem'} />
          </div>
        </FacebookShareButton>

        <InstapaperShareButton
          url={shareUrl}
          title={title}
          description={description}
        >
          <div className="btn btn-circle btn-accent">
            <Instagram size={'1.5rem'} />
          </div>
        </InstapaperShareButton>

        <TwitterShareButton url={shareUrl} title={title} hashtags={hashtags}>
          <div className="btn btn-circle btn-accent">
            <Twitter size={'1.5rem'} />
          </div>
        </TwitterShareButton>
      </div>
    </div>
  );
};
