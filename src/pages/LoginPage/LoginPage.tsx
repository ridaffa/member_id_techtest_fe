import './style.scss';

import logo from '../../assets/logo.png';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';

import { createRef, useState } from 'react';
import { Input } from '../../components/Input/Input';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { Toaster, toast } from 'react-hot-toast';
import { useCookies } from 'react-cookie';

export default function Login() {
  const emailRef = createRef<HTMLInputElement>();
  const [loading, setLoading] = useState(false);
  const setCookie = useCookies(['jwt'])[1];
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailRef.current?.value) {
      setLoading(true);
      fetch(`${process.env.REACT_APP_BE_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailRef.current.value }),
      })
        .then((response) => {
          if (response.status === 404)
            throw new Error('Email Address is not exist');
          if (!response.ok) throw new Error('Something went wrong');
          return response.json();
        })
        .then((data) => {
          setCookie('jwt', data.message.token, {
            path: '/',
            expires: new Date(data.message.expiredIn - 1000 * 60 * 60),
          });
        })
        .catch((e) => {
          toast.error(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <div className='page login'>
      <Toaster />
      {loading ? <LoadingSpinner /> : null}
      <div className='login__title'>
        <div className='login__logo'>
          <img src={logo} alt='logo' />
        </div>
        <h1>AWARDS</h1>
        <p>
          Enter your email address <br /> to sign in and continue
        </p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Input
          required={true}
          type='email'
          placeholder='Email Address'
          ref={emailRef}
        />
        <Button type='submit' text='Sign In' />
      </Form>
    </div>
  );
}
