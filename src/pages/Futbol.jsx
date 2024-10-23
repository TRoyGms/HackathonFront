import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import Header from '../components/organisms/Header';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import ProductCardClient from '../components/molecules/ProductCardClient';
import { useAuth } from '../context/AuthContext';

function Futbol() {
  const navigate = useNavigate();
  const { products, setProducts } = useProductContext();
  const [futbolProducts, setFutbolProducts] = useState([]);
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
        setFutbolProducts(data.filter(product => product.Categoria === 'Futbol'));
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
          <title>CATEGORÍA FÚTBOL</title>
            </Helmet>
      <Header 
        title="ATHLETIC STORE" 
        logoSrc="/LOGO_BLACK.jpeg"
        subtitle="FÚTBOL"
        showSubmenu={true}
        className="bg-white"
        homeIconSrc="/path/to/home_icon.png"
        onHomeClick={()=>navigate("/")}
        isLoggedIn={isLoggedIn}
        onLogoutClick={handleLogoutClick}
      />
      <div className="p-8 text-white flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {futbolProducts && futbolProducts.map(product => (
            <ProductCardClient key={product.Folio_producto} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Futbol;
