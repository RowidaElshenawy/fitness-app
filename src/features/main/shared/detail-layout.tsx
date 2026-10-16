import type { ReactNode } from 'react';

import SectionBgWord from './sec-bg-word';
import workoutsBg from '@/assets/workouts-bg.png';

interface MasterDetailLayoutProps {
  bgWord?: string;
  bgImage?: string;
  header?: ReactNode;
  sidebarHeader?: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
}

export default function MasterDetailLayout({
  bgWord,
  bgImage = workoutsBg,
  header,
  sidebarHeader,
  sidebar,
  children,
}: MasterDetailLayoutProps) {
  return (
    <section
      className="relative isolate w-full overflow-hidden bg-cover bg-center bg-no-repeat pt-13"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div aria-hidden className="absolute inset-0 z-0 bg-bg-plain/60 backdrop-blur-md " />

      <SectionBgWord className="pt-18">{bgWord}</SectionBgWord>

      <div className="relative z-10 mx-auto w-full max-w-360 px-4 pt-18 pb-12 md:px-8 xl:px-20">
        {header && <div className="mb-6">{header}</div>}

        <div className="grid items-start gap-6 md:grid-cols-[5fr_12fr]">
          <aside className="min-w-0 rounded-lg border border-border-subtle bg-bg-subtle/60 p-4 backdrop-blur-md">
            {sidebarHeader && (
              <div className="mb-4 overflow-x-auto scrollbar-none">{sidebarHeader}</div>
            )}

            <div className="max-h-[70vh] overflow-y-auto scrollbar-hide">{sidebar}</div>
          </aside>

          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}
