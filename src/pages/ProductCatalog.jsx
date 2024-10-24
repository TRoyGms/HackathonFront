import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import { useProductContext } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

function ProductCatalog() {
  const { products, setProducts } = useProductContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const { authToken, logout } = useAuth();
  const isLoggedIn = !!authToken;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://localhost:8080/api/Productos');
        if (!response.ok) {
          throw new Error('Error al recuperar los productos');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error al recuperar los productos:', error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  useEffect(() => {
    if (searchTerm) {
      const fetchSearchResults = async () => {
        try {
          const response = await fetch(`https://localhost:8080/api/Productos/buscar/${searchTerm}`);
          if (!response.ok) {
            throw new Error('Error al buscar productos');
          }
          const data = await response.json();
          setFilteredProducts(data);
        } catch (error) {
          console.error('Error al buscar productos:', error);
        }
      };

      fetchSearchResults();
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };


  return (
    <div className="min-h-screen bg-black">
            <Helmet>
            <title>CATÁLOGO</title>
            </Helmet>
      <Header 
        title="CATÁLOGO DE ARTÍCULOS" 
        logoSrc="/LOGO_BLACK.jpeg" 
        className="bg-white"
        onHomeClick={() => navigate('/')}
        searchTerm={searchTerm}
        showSubmenu={true}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        showSearch={true} // Solo para la vista de ProductCatalog
        isLoggedIn={isLoggedIn}
        onLogoutClick={handleLogoutClick}
      />
      <div className="container mx-auto p-8 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts && filteredProducts.map(product => (
                <div key={product.Folio_producto} onClick={() => navigate(`/product/${product.Folio_producto}`)} className="cursor-pointer grid justify-center p-4 border rounded-lg text-center bg-white hover:bg-gray-300 w-60 transform transition-transform duration-300 hover:scale-110">
                    <img src={`https://localhost:8080/${product.Imagen}`} alt={product.Nombre_modelo} className="rounded-3xl h-auto mx-auto mb-2" />
                    <h3 className="text-xl font-bold">{product.Nombre_modelo}</h3>
                    <p>{product.Categoria}</p>
                    <p>${product.Precio}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCatalog;