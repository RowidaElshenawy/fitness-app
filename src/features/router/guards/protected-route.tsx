import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { locale } = useParams();
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/${locale}/login`} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
