import './style.scss';

type Props = {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function Form({ children, onSubmit }: Props) {
  return <form onSubmit={onSubmit}>{children}</form>;
}
