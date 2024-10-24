import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import { useWishlistContext } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const navigate = useNavigate();
  const { addToWishlist } = useWishlistContext();
  const { authToken, clientId, logout } = useAuth();
  const isLoggedIn = !!authToken;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://localhost:8080/api/Productos/${id}`);
        if (!response.ok) {
          throw new Error('Error al recuperar el producto');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error al recuperar el producto:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToWishlist = async () => {
    if (!authToken) {
      Swal.fire({
        title: 'Debe iniciar sesión',
        text: 'Por favor inicie sesión para agregar productos a su lista de deseos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Iniciar Sesión',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }
    if (!size) {
      Swal.fire({
        title: 'Seleccione una talla',
        text: 'Por favor seleccione una talla antes de agregar el producto a la lista de deseos.',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    console.log('Producto:', product); 
    console.log('Producto ID:', product.Folio_producto); 
    console.log('Cliente ID:', clientId); 

    try {
      const response = await fetch('https://localhost:8080/api/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':  localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          Id_Cliente: clientId,
          Id_Producto: product.Folio_producto,
          Cantidad: quantity,
          Talla: size,
          Subtotal: product.Precio * quantity
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Producto agregado a la lista de deseos:', data);
        addToWishlist(product, size, quantity);
        navigate('/wishlist');
      } else {
        const errorData = await response.json();
        console.error('Error al agregar a la lista de deseos:', errorData);
      }
    } catch (error) {
      console.error('Error al agregar a la lista de deseos:', error);
    }
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
  <div className="min-h-screen bg-black ">
          <Helmet>
            <title>DETALLES DE PRODUCTO</title>
          </Helmet>
    <Header
      title="DETALLES DEL PRODUCTO"
      logoSrc="/LOGO_BLACK.jpeg"
      className="bg-white text-center"
      showSubmenu={true}
      onHomeClick={() => navigate('/CatalogoClientes')}
      isLoggedIn={isLoggedIn}
      onLogoutClick={handleLogoutClick}
    />
    {product && (
      <div className="container mx-auto p-8 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
          <img src={`https://localhost:8080/${product.Imagen}`} alt={product.Nombre_modelo} className="w-full h-auto mb-2" />
        </div>
        <div className="w-full lg:w-1/2 p-8 bg-white rounded-md">
          <h2 className="text-3xl font-bold">{product.Nombre_modelo}</h2>
          <p>Color: {product.Color}</p>
          <p className="text-2xl text-green-600">${product.Precio}</p>
          <p>Categoría: {product.Categoria}</p>
          <p>Marca: {product.Marca}</p>
          <p>Género: {product.Genero}</p>
          <h3 className="mt-4">Tallas (Centímetros)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
            {[22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5].map(sizeOption => (
              <button
                key={sizeOption}
                className={`border p-2 ${size === sizeOption ? 'bg-yellow-500' : 'bg-white'}`}
                onClick={() => setSize(sizeOption)}
              >
                {sizeOption}
              </button>
            ))}
          </div>
          <br />
          <p className='text-black text-justify'><strong>Descripción:</strong> {product.Descripcion}</p>
          <h3 className="mt-4">Cantidad</h3>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border p-2 w-20"
            min="1"
          />
          <button
            onClick={handleAddToWishlist}
            className="bg-yellow-500 text-white py-2 px-4 rounded mt-4"
          >
            Agregar a la lista de deseos
          </button>
        </div>
      </div>
    )}
  </div>

  );
};

export default ProductDetails;




