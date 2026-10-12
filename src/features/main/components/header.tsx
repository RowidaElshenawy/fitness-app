// features/main/components/Header.tsx
import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu } from 'lucide-react';

import logo from '@/assets/image/logo.png';
import { NAV_LINKS } from '../shared/constants';
import { Button } from '@/shared/components/ui/button';
import UserMenu from './user-menu';

export default function Header() {
  const { t } = useTranslation();
  const { locale } = useParams();

  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-colors hover:text-bg-primary ${
      isActive ? 'text-bg-primary' : 'text-text-plain'
    }`;

  const getPath = (path: string) => (path ? `/${locale}/${path}` : `/${locale}`);

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <img src={logo} alt="Super Fitness" className="h-12 w-auto" />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ key, path }) => (
            <NavLink
              key={key}
              to={getPath(path)}
              end={path === ''}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {t(`main.header.nav.${key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <UserMenu />

          <Button
            variant="primary"
            size="icon"
            className="md:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <Menu />
          </Button>
        </div>
      </div>

      {open && (
        <nav className="absolute  w-80 top-0 flex flex-col gap-5 bg-bg-plain px-6 py-5 backdrop-blur md:hidden">
          <img src={logo} alt="Super Fitness" className="h-20 w-20" />
          {NAV_LINKS.map(({ key, path }) => (
            <NavLink key={key} to={getPath(path)} end={path === ''} className={linkClass}>
              {t(`main.header.nav.${key}`)}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
