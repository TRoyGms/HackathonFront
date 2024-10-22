import { Helmet } from 'react-helmet';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import ProductCardAdmin from '../components/molecules/ProductCardAdmin';
import BoxGestionAdmin from '../components/organisms/BoxGestionAdmin';
import { useProductContext } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

function ProductListAdmin() {
  const { products, setProducts, deleteProduct } = useProductContext();
  const navigate = useNavigate();

  const { authToken, logout } = useAuth();
    const isLoggedIn = !!authToken;

    const handleLogoutClick = () => {
        logout();
        navigate('/');
    };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://athleticstoreapi.integrador.xyz/api/Productos');
        if (!response.ok) {
          throw new Error('Error al recuperar los productos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al recuperar los productos:', error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  return (
    <div className="min-h-screen bg-black">
            <Helmet>
            <title>GESTIÓN ARTÍCULOS</title>
            </Helmet>
    <Header 
      title="GESTIÓN ARTÍCULOS"
      logoSrc="/LOGO_BLACK.jpeg" 
      className="bg-white"
      onHomeClick={() => navigate("/HomeAdmin")}
      isLoggedIn={isLoggedIn}
      onLogoutClick={handleLogoutClick}
      isAdminView={true}
    />
    <div className="container mx-auto p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <BoxGestionAdmin onAddProductClick={() => navigate('/AgregarProducto')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {products && products.map(product => (
          <ProductCardAdmin 
            key={product.Folio_producto} 
            product={product} 
            onEdit={() => navigate(`/edit/${product.Folio_producto}`)} 
            onDelete={() => deleteProduct(product.Folio_producto)} 
          />
        ))}
      </div>
    </div>
  </div>
  );
}

export default ProductListAdmin;
