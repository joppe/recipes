import { useAuth } from '../auth/useAuth';

export function Logout() {
  const { logout } = useAuth();

  const handleClick = () => {
    logout();
  };

  return (
    <button type="button" onClick={handleClick}>
      Logout
    </button>
  );
}
