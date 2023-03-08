import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {};

export default function ProtectedPage({}: Props) {
  const cookie = useCookies(['jwt'])[0];
  const removeCookie = useCookies(['jwt'])[2];
  if (!cookie || !cookie.jwt) {
    removeCookie('jwt');
    return <Navigate to={'/'} />;
  } else {
    return <Outlet></Outlet>;
  }
}
