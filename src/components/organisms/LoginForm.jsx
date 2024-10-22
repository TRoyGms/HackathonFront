import { useState } from 'react';
import Field from '../molecules/Field';
import Button from '../atoms/Button';

export default function LoginForm({ onSubmit, onCancel }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value) => {
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(value)) {
      setEmailError('El dato de entrada no cumple lo requerido');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (value) => {
    if (value.trim() === '') {
      setPasswordError('El campo contraseña es requerido');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handleBlurEmail = () => {
    validateEmail(email);
  };

  const handleBlurPassword = () => {
    validatePassword(password);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email) && validatePassword(password)) {
      onSubmit({ Email: email, Contraseña: password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="mb-4">
        <Field
          type="email"
          name="Email"
          label="Email:"
          value={email}
          onChange={handleChangeEmail}
          onBlur={handleBlurEmail}
          className={` ${emailError ? 'border-red-500' : email ? 'border-green-500' : 'border-gray-300'}`}
          required
        />
        {emailError && <label className="text-red-500">{emailError}</label>}
      </div>
      <div className="mb-4">
        <Field
          type="password"
          name="Contraseña"
          label="Contraseña:"
          value={password}
          onChange={handleChangePassword}
          onBlur={handleBlurPassword}
          className={` ${passwordError ? 'border-red-500' : password ? 'border-green-500' : 'border-gray-300'}`}
          required
        />
        {passwordError && <label className="text-red-500">{passwordError}</label>}
      </div>
      <div className="flex justify-between mt-6">
        <Button type="submit" className="bg-black text-white hover:bg-yellow-500 hover:text-black">Iniciar Sesión</Button>
        <Button type='button' onClick={onCancel} className="bg-gray-400 text-white hover:bg-gray-600">Cancelar</Button>
      </div>
    </form>
  );
}
