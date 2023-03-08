import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Login from './pages/LoginPage/LoginPage';
import AwardPage from './pages/AwardPage/AwardPage';
import Sidebar from './components/Sidebar/Sidebar';
import ProtectedPage from './pages/ProtectedPage/ProtectedPage';
import { LogoutPage } from './pages/LogoutPage/LogoutPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route element={<ProtectedPage />}>
        <Route element={<Sidebar />}>
          <Route path='/awards' element={<AwardPage />} />
        </Route>
        <Route path='/logout' element={<LogoutPage />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
