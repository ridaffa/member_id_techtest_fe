import { useEffect, useRef } from 'react';
import './style.scss';

type Props = {
  setShowModal: (value: boolean) => void;
  children?: React.ReactNode;
  title: string;
};
export default function Modal({ title, setShowModal, children }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleModalClose = () => {
    if (modalRef.current) {
      modalRef.current.style.opacity = '0';
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.style.display = 'none';
          setShowModal(false);
        }
      }, 300);
    }
  };
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.style.display = 'block';
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.style.opacity = '1';
        }
      }, 1);
    }
  }, []);
  return (
    <div ref={modalRef} className='modal'>
      <div className='modal__header'>
        <h2>{title}</h2>
        <h3 className='modal__header__close' onClick={handleModalClose}>
          X
        </h3>
      </div>
      <div className='modal__content'>{children}</div>
    </div>
  );
}
