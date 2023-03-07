import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import SidebarConsumer from '../../contexts/SidebarContext';
import { NavLink } from 'react-router-dom';
import './style.scss';

type Props = {};

export default function Sidebar({}: Props) {
  const navigate = useNavigate();
  const sidebarConsumer = SidebarConsumer();
  const handleCollapse = () => {
    sidebarConsumer.setSidebar?.(!sidebarConsumer.sidebar);
  };
  return (
    <div className='container'>
      <div
        className={`container__sidebar ${
          sidebarConsumer.sidebar ? '' : 'collapsed'
        }`}
      >
        <div
          className={`sidebar ${sidebarConsumer.sidebar ? '' : 'collapsed'}`}
        >
          <div className='sidebar__header'>
            <div className='sidebar__header__logo'>
              <img src={logo} alt='logo' />
            </div>
            <div className='sidebar__header__title'>
              <h1>Awards Menu</h1>
            </div>
          </div>
          <div className='sidebar__content'>
            <NavLink to={'/awards'}>Awards</NavLink>
            <NavLink to={'/#'}>Cards</NavLink>
            <NavLink to={'/#'}>Profile</NavLink>
            <NavLink to={'/logout'}>Logout</NavLink>
          </div>
        </div>
        <div
          onClick={() => {
            handleCollapse();
          }}
          className={`content ${sidebarConsumer.sidebar ? '' : 'collapsed'}`}
        ></div>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
