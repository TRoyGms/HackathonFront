import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import Header from '../components/organisms/Header';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import ProductCardClient from '../components/molecules/ProductCardClient';
import { useAuth } from '../context/AuthContext';

function Casual() {
  const { products, setProducts } = useProductContext();
  const navigate = useNavigate();
  const [casualProducts, setCasualProducts] = useState([]);
  const { authToken, logout } = useAuth();
  const isLoggedIn = !!authToken;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://athleticstoreapi.integrador.xyz/api/Productos');
        if (!response.ok) {
          throw new Error('Error al recuperar los productos');
        }
        const data = await response.json();
        setProducts(data);
        setCasualProducts(data.filter(product => product.Categoria === 'Casual'));
      } catch (error) {
        console.error('Error al recuperar los productos:', error);
      }
    };

    fetchProducts();
  }, [setProducts]);

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };     

  return (
    <div className="min-h-screen bg-black">
            <Helmet>
          <title>CATEGORÍA CASUAL</title>
          </Helmet>
      <Header 
        title="ATHLETIC_STORE" 
        subtitle="CASUAL"
        logoSrc="/LOGO_BLACK.jpeg"
        className="bg-white"
        showSubmenu={true}
        homeIconSrc="/path/to/home_icon.png"
        onHomeClick={()=>navigate("/")}
        isLoggedIn={isLoggedIn}
        onLogoutClick={handleLogoutClick}
      />
      <div className="p-8 text-white flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {casualProducts && casualProducts.map(product => (
            <ProductCardClient key={product.Folio_producto} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Casual;
