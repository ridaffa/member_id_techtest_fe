import './style.scss';

type Props = {
  type: 'close' | 'open';
  text: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClose?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export default function SelectedText({ onClick, onClose, type, text }: Props) {
  return (
    <div onClick={onClick} className={`selected-text ${type}`}>
      <span>{text}</span>
      {type === 'close' ? (
        <div onClick={onClose} className='selected-text__close'>
          <span>✖</span>
        </div>
      ) : null}
    </div>
  );
}
