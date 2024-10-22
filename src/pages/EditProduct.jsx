import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import { useProductContext } from '../context/ProductContext';
import Swal from 'sweetalert2';

const EditProduct = () => {
  const { id } = useParams();
  const { products, editProduct } = useProductContext();
  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const productToEdit = products.find(prod => prod.Folio_producto === parseInt(id));
    if (productToEdit) {
      setProduct(productToEdit);
      setPrice(productToEdit.Precio);
    }
  }, [id, products]);

  const handleSave = () => {
    Swal.fire({
      title: '¿Está seguro de guardar los cambios?',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProduct = { ...product, Precio: price };
        editProduct(updatedProduct);
        navigate('/Gestion');
      }
    });
  };

  return (
  <div className='min-h-screen bg-black'>
          <Helmet>
          <title>PRODUCTOS</title>
          </Helmet>
    <Header
      title="EDITAR PRODUCTO"
      logoSrc="/LOGO_BLACK.jpeg"
      className="bg-white"
      onHomeClick={() => navigate('/Gestion')}
    />
  {product && (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold">{product.Nombre_modelo}</h2>
        <p><strong>Color:</strong> {product.Color}</p>
        <p><strong>Categoría:</strong> {product.Categoria}</p>
        <p><strong>Marca:</strong> {product.Marca}</p>
        <p><strong>Género:</strong> {product.Genero}</p>
        <p><strong>Descripción:</strong> {product.Descripcion}</p>
        <img src={`https://athleticstoreapi.integrador.xyz/${product.Imagen}`} alt={product.Nombre_modelo} className="w-full h-auto mb-2" />
        <label className="block mt-4">
          <span className="text-gray-700">Precio</span>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
        <button
          onClick={handleSave}
          className="bg-yellow-500 text-white py-2 px-4 rounded mt-4 hover:bg-yellow-600"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
    )}
  </div>
  );
};

export default EditProduct;
