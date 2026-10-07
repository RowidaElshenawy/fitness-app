import type { ReactNode } from 'react';

interface MediaHeroProps {
  image?: string;
  title: string;
  description?: ReactNode;
  mediaAction?: ReactNode;
  footer?: ReactNode;
}

export default function MediaHero({ image, title, description }: MediaHeroProps) {
  return (
    <div className="relative isolate flex min-h-128 items-end overflow-hidden rounded-lg border border-border-subtle bg-[#242424]">
      {image && (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-top"
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-[#242424] via-[#242424]/70 to-transparent dark:from-[#242424] dark:via-[#242424]/70"
      />

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-bg-plain/30 to-transparent dark:from-[#242424]/70"
      />
      <div className="w-full p-6 text-text-plain md:p-10">
        <h2 className="text-center text-3xl font-bold md:text-5xl">{title}</h2>

        {description && <div className="mt-6 max-w-3xl text-base md:text-lg">{description}</div>}
      </div>
    </div>
  );
}
