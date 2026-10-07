import type { ReactNode } from 'react';
import SectionBgWord from './sec-bg-word';
import workoutsBg from '@/assets/workouts-bg.png';
interface MasterDetailLayoutProps {
  bgWord: string;
  bgImage?: string;
  header?: ReactNode;

  sidebar: ReactNode;

  children: ReactNode;
}

// Shared by Healthy (meals) and Classes (exercises)

export default function MasterDetailLayout({
  bgWord,

  header,
  sidebar,
  children,
}: MasterDetailLayoutProps) {
  return (
    <section
      className="relative isolate w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${workoutsBg})` }}
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-0 h-full bg-white/60 backdrop-blur-md dark:bg-[#242424]/60"
      />

      <SectionBgWord>{bgWord}</SectionBgWord>

      <div className="relative mx-auto w-full max-w-360 px-4 pt-18 pb-12 md:px-8 xl:px-20">
        {header && <div className="mb-6">{header}</div>}

        <div className="grid items-start gap-6 md:grid-cols-8">
          <aside className="min-w-0 h-full rounded-lg border border-border-subtle bg-bg-subtle/60 p-4 backdrop-blur-md md:col-span-3 ">
            {sidebar}
          </aside>
          <div className="min-w-0 md:col-span-5">{children}</div>
        </div>
      </div>
    </section>
  );
}
