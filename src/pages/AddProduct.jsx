import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import AddProductForm from '../components/organisms/AddProductForm';
import { useProductContext } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

export default function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useProductContext();
  const { authToken, logout } = useAuth();
  const isLoggedIn = !!authToken;

  const handleAddProduct = async (product) => {
    const formData = new FormData();
    formData.append('Folio_producto', product.folio);
    formData.append('Nombre_modelo', product.nombre);
    formData.append('Descripcion', product.descripcion);
    formData.append('Precio', product.precio);
    formData.append('Categoria', product.categoria);
    formData.append('Marca', product.marca);
    formData.append('Color', product.color);
    formData.append('Genero', product.genero);
    formData.append('imagen', product.imagen);

    try {
      console.log('Sending token:', authToken);
      const response = await fetch('https://athleticstoreapi.integrador.xyz/api/Productos', {
        method: 'POST',
        headers: {
          'Authorization':  localStorage.getItem('authToken'),
        },
        body: formData,
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la respuesta del servidor:', errorData);
        throw new Error('Error al enviar los datos a la API');
      }

      const data = await response.json();
      console.log('Producto enviado correctamente:', data);
      console.log('Producto agregado con el token:', authToken)
      addProduct(product);
      navigate('/gestion');
    } catch (error) {
      console.error('Error al enviar el producto:', error);
    }
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <div className='min-h-screen bg-black'>
      <Helmet>
        <title>PRODUCTOS</title>
      </Helmet>
      <Header
        title="AGREGAR PRODUCTO"
        logoSrc="/LOGO_BLACK.jpeg"
        className="bg-white"
        onHomeClick={() => navigate('/Gestion')}
        isLoggedIn={isLoggedIn}
        onLogoutClick={handleLogoutClick}
        isAdminView={true}
      />
      <div className="max-w-xl mx-auto p-6 bg-white rounded-md mt-8">
        <h2 className="text-2xl text-center font-bold mb-6">Agregar Producto</h2>
        <AddProductForm onSubmit={handleAddProduct} onCancel={() => navigate('/')} />
      </div>
    </div>
  );
}
