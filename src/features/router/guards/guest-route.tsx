import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { locale } = useParams();

  if (user) return <Navigate to={`/${locale}`} replace />;

  return <>{children}</>;
};

export default GuestRoute;
