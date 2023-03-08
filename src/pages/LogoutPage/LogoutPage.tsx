import { useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';

export const LogoutPage = () => {
  const removeCookie = useCookies(['jwt'])[2];
  removeCookie('jwt');
  return <Navigate to='/' />;
};
