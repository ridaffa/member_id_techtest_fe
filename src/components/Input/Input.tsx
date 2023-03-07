import './style.scss';
import { forwardRef } from 'react';

type Props = {
  type: 'text' | 'number' | 'email' | 'password';
  placeholder?: string;
  value?: string;
  required?: boolean;
};
export type Ref = HTMLInputElement;

export const Input = forwardRef<Ref, Props>((props, ref) => (
  <input
    type={props.type}
    placeholder={props.placeholder}
    value={props.value}
    required={props.required}
    ref={ref}
  />
));
