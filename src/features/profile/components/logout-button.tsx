import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  return (
    <button type="button" onClick={handleLogout}>
      Sign out
    </button>
  );
};

export default LogoutButton;
