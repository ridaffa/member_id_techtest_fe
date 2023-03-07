import SidebarConsumer from '../../contexts/SidebarContext';
import './style.scss';

type Props = {
  title: string;
  onClickStrawberry?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export default function PageHeader({ title, onClickStrawberry }: Props) {
  const sidebarConsumer = SidebarConsumer();
  const onClickBurger = () => {
    sidebarConsumer.setSidebar?.(!sidebarConsumer.sidebar);
  };
  return (
    <div onClick={onClickBurger} className='page-header'>
      <div className='burger'>
        <div className='burger__top'></div>
        <div className='burger__middle'></div>
        <div className='burger__bottom'></div>
      </div>
      <h2>{title}</h2>
      <div onClick={onClickStrawberry} className='strawberry'>
        <div className='strawberry__top'></div>
        <div className='strawberry__middle'></div>
        <div className='strawberry__bottom'></div>
      </div>
    </div>
  );
}
