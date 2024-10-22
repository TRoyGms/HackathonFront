import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import { useAuth } from '../context/AuthContext';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const PedidosAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const { authToken, logout } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = !!authToken;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch(`https://athleticstoreapi.integrador.xyz/api/Pedidos`, {
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
          console.error('Error al cargar los pedidos:', errorData);
        }
      } catch (error) {
        console.error('Error al cargar los pedidos:', error);
      }
    };

    if (authToken) {
      loadOrders();
    }
  }, [authToken]);

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  const handleRejectOrder = async (orderId) => {
    try {
      const response = await fetch(`https://athleticstoreapi.integrador.xyz/api/Pedidos/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          Estatus: 'Rechazado',
        }),
      });

      if (response.ok) {
        console.log('Pedido rechazado:', await response.json());
        loadOrders();
      } else {
        const errorData = await response.json();
        console.error('Error al rechazar el pedido:', errorData);
      }
    } catch (error) {
      console.error('Error al rechazar el pedido:', error);
    }
  };

  const handleAcceptOrder = (order) => {
    setCurrentOrder(order);
    setModalIsOpen(true);
  };

  const handleUpdateOrder = async (status) => {
    try {
      const response = await fetch(`https://athleticstoreapi.integrador.xyz/api/Pedidos/${currentOrder.Id_Pedido}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          Estatus: status,
        }),
      });

      if (response.ok) {
        console.log('Pedido actualizado:', await response.json());
        setModalIsOpen(false);
        loadOrders();
      } else {
        const errorData = await response.json();
        console.error('Error al actualizar el pedido:', errorData);
      }
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black">
            <Helmet>
            <title>GESTIÓN PEDIDOS</title>
            </Helmet>
    <Header
      title="GESTIÓN PEDIDOS"
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
          <p>ID Cliente: {order.Id_Cliente}</p>
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
          <div className="flex flex-col sm:flex-row justify-end mt-4">
            <button onClick={() => handleAcceptOrder(order)} className=" bg-black text-white rounded hover:bg-yellow-500 hover:text-black  py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2">Aceptar</button>
            <button onClick={() => handleRejectOrder(order.Id_Pedido)} className="bg-gray-400 text-white  hover:bg-gray-600 py-2 px-4 rounded ">Rechazar</button>
          </div>
        </div>
      ))}
    </div>

    {currentOrder && (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Actualizar Pedido"
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
          <h2 className="text-2xl mb-4">Actualizar Pedido</h2>
          <p>¿Desea cambiar el estatus del pedido a "Entrega inmediata" o "Entrega en 15 días"?</p>
          <div className="flex flex-col sm:flex-row justify-end mt-4">
            <button onClick={() => handleUpdateOrder('Entrega inmediata')} className="bg-green-500 text-white py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2 hover:bg-green-600">Entrega inmediata</button>
            <button onClick={() => handleUpdateOrder('Entrega en 15 días')} className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">Entrega en 15 días</button>
          </div>
        </div>
      </Modal>
    )}
  </div>
  );
};  

export default PedidosAdmin;
