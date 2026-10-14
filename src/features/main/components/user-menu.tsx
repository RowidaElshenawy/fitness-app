import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, User } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export default function UserMenu() {
  const { t } = useTranslation();
  const { locale } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const go = (path: string) => {
    setOpen(false);
    navigate(`/${locale}/${path}`);
  };

  return (
    <div ref={ref} className="relative">
      <Button
        variant="primary"
        size="icon"
        aria-label="User menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <User />
      </Button>

      {open && (
        <div className="absolute end-0 top-full z-30 mt-3 flex w-48 flex-col gap-5 rounded-2xl  p-4 shadow-lg">
          <Button size="sm" icon={<ArrowUpRight />} onClick={() => go('login')}>
            {t('main.header.nav.login')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={<ArrowUpRight />}
            onClick={() => go('register')}
          >
            {t('main.header.nav.signup')}
          </Button>
        </div>
      )}
    </div>
  );
}
