import './style.scss';

type Props = {
  className?: 'light' | 'dark';
  type: 'submit' | 'reset' | 'button';
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Button({
  className = 'dark',
  type = 'button',
  text,
  onClick,
}: Props) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {text}
    </button>
  );
}
