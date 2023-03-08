import './style.scss';

type Props = {
  point: string;
  type: string;
  image: string;
  title: string;
};

export default function Card({ point, type, image, title }: Props) {
  return (
    <div className='card-container'>
      <div className='card'>
        <div className='card__point'>{point}</div>
        <div className='card__type'>
          <div
            className={`card__type__box ${
              type === 'vouchers' ? 'blue' : type === 'products' ? 'red' : ''
            }`}
          >
            <span>{type}</span>
          </div>
        </div>
        <img src={image} alt='' loading='lazy' />
      </div>
      <div className='card-container__title'>{title}</div>
    </div>
  );
}
