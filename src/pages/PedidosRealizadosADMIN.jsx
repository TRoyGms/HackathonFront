import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import { useAuth } from '../context/AuthContext';

const PedidosRealizadosADMIN = () => {
  const [orders, setOrders] = useState([]);
  const { authToken, logout } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = !!authToken;

  useEffect(() => {
    const loadAcceptedOrders = async () => {
      try {
        const response = await fetch(`https://athleticstoreapi.integrador.xyz/api/Pedidos/estatus/entrega`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authToken'),
          },
        });

        if (response.ok) {
          const data = await response.json();
          
          const orderDetailsPromises = data.map(order =>
            fetch(`https://athleticstoreapi.integrador.xyz/api/Detalle_pedidos`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authToken'),
              },
            })
            .then(response => response.json())
            .then(details => ({ ...order, Detalles: details.filter(detail => detail.Id_Pedido === order.Id_Pedido) }))
          );

          const ordersWithDetails = await Promise.all(orderDetailsPromises);
          setOrders(ordersWithDetails);
        } else {
          const errorData = await response.json();
          console.error('Error al cargar los pedidos aceptados:', errorData);
        }
      } catch (error) {
        console.error('Error al cargar los pedidos aceptados:', error);
      }
    };

    if (authToken) {
      loadAcceptedOrders();
    }
  }, [authToken]);

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black">
            <Helmet>
            <title>PEDIDOS REALIZADOS</title>
            </Helmet>
    <Header
      title="PEDIDOS REALIZADOS"
      logoSrc="/LOGO_BLACK.jpeg"
      className="bg-white"
      onHomeClick={() => navigate('/HomeAdmin')}
      isLoggedIn={isLoggedIn}
      onLogoutClick={handleLogoutClick}
      isAdminView={true}
    />
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      {orders.map(order => (
        <div key={order.Id_Pedido} className="bg-white p-4 rounded-lg shadow-lg mb-4">
          <h3 className="text-xl font-bold">Pedido ID: {order.Id_Pedido}</h3>
          <p>Fecha: {order.Fecha}</p>
          <p>Total: ${order.Total}</p>
          <p>Estatus: {order.Estatus}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left mt-4">
              <thead>
                <tr>
                  <th className="border p-2 text-center">IMAGEN</th>
                  <th className="border p-2 text-center">MODELO</th>
                  <th className="border p-2 text-center">TALLA</th>
                  <th className="border p-2 text-center">CANTIDAD</th>
                  <th className="border p-2 text-center">SUB-TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {order.Detalles && order.Detalles.map(detalle => (
                  <tr key={detalle.Id_Detalle} className="border">
                    <td className="border p-2 flex justify-center items-center"><img src={`https://athleticstoreapi.integrador.xyz/${detalle.Imagen}`} alt={detalle.Nombre_modelo} className="w-20 h-auto rounded-full" /></td>
                    <td className="border p-2 text-center">{detalle.Nombre_modelo}</td>
                    <td className="border p-2 text-center">{detalle.Talla}</td>
                    <td className="border p-2 text-center">{detalle.Cantidad}</td>
                    <td className="border p-2 text-center">${detalle.Subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default PedidosRealizadosADMIN;
