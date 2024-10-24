

import { useState } from 'react';
import Field from '../molecules/Field';
import Button from '../atoms/Button';
import Label from '../atoms/Label';

export default function AddProductForm({ onSubmit, onCancel }) {
  const [product, setProduct] = useState({
    folio: '',
    nombre: '',
    precio: '',
    descripcion: '',
    categoria: 'Futbol',
    marca: '',
    color: '',
    genero: 'hombre',
    imagen: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'precio' && value < 0) {
        return;
      }

    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length) {
      setProduct({ ...product, imagen: files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <Field
        type="text"
        name="folio"
        label="Folio"
        value={product.folio}
        onChange={handleChange}
      />
      <Field
        type="text"
        name="nombre"
        label="Nombre"
        value={product.nombre}
        onChange={handleChange}
      />
      <Field
        type="number"
        name="precio"
        label="Precio"
        value={product.precio}
        onChange={handleChange}
        
      />
      <Field
        type="textarea"
        name="descripcion"
        label="Descripción"
        value={product.descripcion}
        onChange={handleChange}
      />
      <Field
        type="select"
        name="categoria"
        label="Categoría"
        value={product.categoria}
        onChange={handleChange}
        options={[
          { value: 'Futbol', label: 'Futbol' },
          { value: 'Casual', label: 'Casual' },
          { value: 'Running', label: 'Running' },
        ]}
      />
      <Field
        type="text"
        name="marca"
        label="Marca"
        value={product.marca}
        onChange={handleChange}
      />
      <Field
        type="text"
        name="color"
        label="Color"
        value={product.color}
        onChange={handleChange}
      />
      <Field
        type="select"
        name="genero"
        label="Género"
        value={product.genero}
        onChange={handleChange}
        options={[
          { value: 'hombre', label: 'Hombre' },
          { value: 'mujer', label: 'Mujer' },
          { value: 'unisex', label: 'Unisex' },
        ]}
      />
      <div className="mb-4">
        <Label text="Imagen" htmlFor="imagen" />
        <input
          type="file"
          name="imagen"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex justify-between mt-6">
        <Button type="submit" className="bg-yellow-500 text-white hover:bg-yellow-600">Confirmar</Button>
        <Button type='button' onClick={onCancel} className="bg-gray-400 text-white hover:bg-gray-600">Cancelar</Button>
      </div>
    </form>
    </>
  );
}
