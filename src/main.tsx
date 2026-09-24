import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n/i18n';
import Providers from '@/shared/providers';
import AppRouter from './features/router/app-router.tsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
createRoot(document.getElementById('root')!).render(
  <Providers>
    <AppRouter />
  </Providers>
);
