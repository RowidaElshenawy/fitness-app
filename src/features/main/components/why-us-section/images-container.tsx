import { cn } from '@/shared/lib/utils/tailwind-cn';
import type { ComponentProps } from 'react';

const BASE = '/images/why-us-images';

type PhotoProps = {
  src: string;
  alt: string;
  ratio: string;
  className?: string;
};

function Photo({ src, alt, ratio, className }: PhotoProps) {
  return (
    <div className={cn('max-w-full overflow-hidden rounded-2xl bg-muted', ratio, className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="size-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
}

type ImagesContainerProps = ComponentProps<'div'>;

export default function ImagesContainer({ className, ...props }: ImagesContainerProps) {
  return (
    <div className={cn('grid w-fit grid-cols-[auto_auto] gap-2', className)} {...props}>
      {/* Column 1 */}
      <div className="flex flex-col gap-2">
        <Photo
          src={`${BASE}/Image0.png`}
          alt="Trainer in a gym"
          ratio="aspect-[191/278]"
          className="w-[171px] md:w-[191px]"
        />
        <Photo
          src={`${BASE}/Image1.png`}
          alt="Man standing in the gym"
          ratio="aspect-[191/236]"
          className="w-[171px] md:w-[191px]"
        />
      </div>

      {/* Column 2 (staggered) */}
      <div className="flex flex-col pb-2 gap-2 pt-6 md:pt-[34px]">
        <Photo
          src={`${BASE}/Image2.png`}
          alt="Athlete lifting dumbbells"
          ratio="aspect-[191/228]"
          className="w-[171px] md:w-[191px]"
        />
        <Photo
          src={`${BASE}/Figure.png`}
          alt="Athlete stretching"
          ratio="aspect-[191/236]"
          className="w-[171px] md:w-[191px]"
        />
      </div>
    </div>
  );
}
