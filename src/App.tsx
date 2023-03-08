import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Login from './pages/LoginPage/LoginPage';
import AwardPage from './pages/AwardPage/AwardPage';
import Sidebar from './components/Sidebar/Sidebar';
import ProtectedPage from './pages/ProtectedPage/ProtectedPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route element={<ProtectedPage />}>
        <Route element={<Sidebar />}>
          <Route path='/awards' element={<AwardPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
