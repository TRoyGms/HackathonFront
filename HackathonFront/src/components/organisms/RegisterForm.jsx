import { useState } from 'react';
import Field from '../molecules/Field';
import Button from '../atoms/Button';

export default function RegisterForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    Nombres: '',
    Apellidos: '',
    Telefono: '',
    Email: '',
    Contraseña: ''
  });

  const [errors, setErrors] = useState({
    Nombres: '',
    Apellidos: '',
    Telefono: '',
    Email: '',
    Contraseña: ''
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'Nombres':
      case 'Apellidos':
        return /^[a-zA-Z\s]+$/.test(value) ? '' : 'Solo se permiten letras y espacios';
      case 'Telefono':
        return /^[0-9]{10}$/.test(value) ? '' : 'Debe tener 10 dígitos';
      case 'Email':
        return /\S+@\S+\.\S+/.test(value) ? '' : 'Email no válido';
      case 'Contraseña':
        return value.trim() !== '' ? '' : 'La contraseña es requerida';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: validateField(name, value)
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors({
      ...errors,
      [name]: validateField(name, value)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      Nombres: validateField('Nombres', formData.Nombres),
      Apellidos: validateField('Apellidos', formData.Apellidos),
      Telefono: validateField('Telefono', formData.Telefono),
      Email: validateField('Email', formData.Email),
      Contraseña: validateField('Contraseña', formData.Contraseña),
    };

    if (Object.values(newErrors).every(error => error === '')) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <div className="mb-4">
        <Field
          type="text"
          name="Nombres"
          label="Nombre(s):"
          value={formData.Nombres}
          onChange={handleChange}
          onBlur={handleBlur}
          className={` ${errors.Nombres ? 'border-red-500' : formData.Nombres ? 'border-green-500' : 'border-gray-300'}`}
          required
        />
        {errors.Nombres && <label className="text-red-500">{errors.Nombres}</label>}
      </div>
      <div className="mb-4">
        <Field
          type="text"
          name="Apellidos"
          label="Apellidos:"
          value={formData.Apellidos}
          onChange={handleChange}
          onBlur={handleBlur}
          className={` ${errors.Apellidos ? 'border-red-500' : formData.Apellidos ? 'border-green-500' : 'border-gray-300'}`}
          required
        />
        {errors.Apellidos && <label className="text-red-500">{errors.Apellidos}</label>}
      </div>
      <div className="mb-4">
        <Field
          type="tel"
          name="Telefono"
          label="Teléfono:"
          value={formData.Telefono}
          onChange={handleChange}
          onBlur={handleBlur}
          className={` ${errors.Telefono ? 'border-red-500' : formData.Telefono ? 'border-green-500' : 'border-gray-300'}`}
          required
        />
        {errors.Telefono && <label className="text-red-500">{errors.Telefono}</label>}
      </div>
      <div className="mb-4">
        <Field
          type="email"
          name="Email"
          label="E-mail:"
          value={formData.Email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={` ${errors.Email ? 'border-red-500' : formData.Email ? 'border-green-500' : 'border-gray-300'}`}
          required
        />
        {errors.Email && <label className="text-red-500">{errors.Email}</label>}
      </div>
      <div className="mb-4">
        <Field
          type="password"
          name="Contraseña"
          label="Contraseña:"
          value={formData.Contraseña}
          onChange={handleChange}
          onBlur={handleBlur}
          className={` ${errors.Contraseña ? 'border-red-500' : formData.Contraseña ? 'border-green-500' : 'border-gray-300'}`}
          required
        />
        {errors.Contraseña && <label className="text-red-500">{errors.Contraseña}</label>}
      </div>
      <div className="flex justify-between mt-6">
        <Button type="submit" className="bg-black text-white hover:bg-yellow-500 hover:text-black">Registrarse</Button>
        <Button type='button' onClick={onCancel} className="bg-gray-400 text-white hover:bg-gray-600">Cancelar</Button>
      </div>
    </form>
  );
}
