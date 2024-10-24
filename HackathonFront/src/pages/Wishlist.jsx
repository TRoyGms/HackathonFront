import { Helmet } from 'react-helmet';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/organisms/Header';
import { useAuth } from '../context/AuthContext';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { Result } from 'postcss';

Modal.setAppElement('#root'); 

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { authToken, clientId, logout } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = !!authToken;
  const sizes = [22, 22.5, 23, 23.5, 24, 24.5, 25, 25.5, 26, 26.5, 27, 27.5, 28, 28.5, 29, 29.5];

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const response = await fetch(`https://localhost:8080/api/wishlist/cliente/${clientId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('authToken'),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setWishlist(data);
        } else {
          const errorData = await response.json();
          console.error('Error al cargar la wishlist:', errorData);
        }
      } catch (error) {
        console.error('Error al cargar la wishlist:', error);
      }
    };

    if (authToken && clientId) {
      loadWishlist();
    }
  }, [authToken, clientId]);

  const calculateTotal = () => {
    return wishlist.reduce((total, item) => total + item.Precio * item.Cantidad, 0);
  };

  const handleLogoutClick = () => {
    Swal.fire({
      title : '¿Estás seguro de cerrar sesión?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((Result) => {
      if(Result.isConfirmed){
        logout();
        navigate('/');
      }
    })
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const openModal = (item) => {
    setCurrentItem(item);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setCurrentItem(null);
    setModalIsOpen(false);
  };

  const handleSizeChange = (newSize) => {
    setCurrentItem({ ...currentItem, Talla: newSize });
  };

  const handleQuantityChange = (newQuantity) => {
    setCurrentItem({ ...currentItem, Cantidad: parseInt(newQuantity, 10) });
  };

  const handleUpdate = async () => {
    const updatedSubtotal = currentItem.Cantidad * currentItem.Precio;
    const currentItemIdWish = parseInt(currentItem.Id_Wish, 10);
    console.log('Actualizando artículo:', {
      Id_Wish: currentItemIdWish,
      Cantidad: currentItem.Cantidad,
      Talla: currentItem.Talla,
      Subtotal: updatedSubtotal
    });

    try {
      const response = await fetch(`https://localhost:8080/api/wishlist/${currentItemIdWish}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          Cantidad: currentItem.Cantidad,
          Talla: currentItem.Talla,
          Subtotal: updatedSubtotal,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Artículo actualizado:', data);
        setWishlist(prevWishlist => prevWishlist.map(item =>
          item.Id_Wish === currentItemIdWish ? { ...currentItem, Subtotal: updatedSubtotal } : item
        ));
        closeModal();
      } else {
        const errorData = await response.json();
        console.error('Error al actualizar el artículo:', errorData);
      }
    } catch (error) {
      console.error('Error al actualizar el artículo:', error);
    }
  };

  const handleRemove = async (wishId) => {
    console.log('Eliminando el item con Id_Wish:', wishId); 
    try {
      const response = await fetch(`https://localhost:8080/api/wishlist/${wishId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': localStorage.getItem('authToken'),
        },
      });

      if (response.ok) {
        console.log('Artículo eliminado');
        setWishlist(prevWishlist => prevWishlist.filter(item => item.Id_Wish !== wishId));
      } else {
        const errorData = await response.json();
        console.error('Error al eliminar el artículo:', errorData);
      }
    } catch (error) {
      console.error('Error al eliminar el artículo:', error);
    }
  };

  const handleOrder = async () => {
    const total = calculateTotal();
    const fecha = new Date().toLocaleDateString();
    const estatus = 'Pendiente';

    try {
      const response = await fetch('https://localhost:8080/api/Pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          Fecha: fecha,
          Id_Cliente: clientId,
          Total: total,
          Estatus: estatus,
        }),
      });

      if (response.ok) {
        const pedidoData = await response.json();
        Swal.fire({
          title : '¿Estás seguro de realizar el pedido?',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then((Result) => {
          if(Result.isConfirmed){
            Swal.fire({
              icon: 'success',
              title: 'Pedido realizado'
            })
            navigate('/ordersClient');
          }
        })
        await Promise.all(
          wishlist.map(async (item) => {
            const detalleResponse = await fetch('https://localhost:8080/api/Detalle_pedidos', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('authToken'),
              },
              body: JSON.stringify({
                Id_Pedido: pedidoData.id,
                Id_Producto: item.Id_Producto,
                Cantidad: item.Cantidad,
                Talla: item.Talla,
                Subtotal: item.Subtotal,
              }),
            });

            if (!detalleResponse.ok) {
              const errorData = await detalleResponse.json();
              console.error('Error al crear el detalle del pedido:', errorData);
            } else {
              const detalleData = await detalleResponse.json();
            }
          })
        );
      } else {
        const errorData = await response.json();
        console.error('Error al crear el pedido:', errorData);
      }
    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  };

  return (
  <div className="min-h-screen bg-black">
          <Helmet>
          <title>WISHLIST</title>
          </Helmet>
    <Header
      title="LISTA DE DESEOS"
      logoSrc="/LOGO_BLACK.jpeg"
      className="bg-white"
      onHomeClick={() => navigate('/')}
      showSubmenu={true}
      isLoggedIn={isLoggedIn}
      onLogoutClick={handleLogoutClick}
    />
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr>
              <th className="border p-2 text-center">IMAGEN</th>
              <th className="border p-2 text-center">MODELO</th>
              <th className="border p-2 text-center">TALLA</th>
              <th className="border p-2 text-center">CANTIDAD</th>
              <th className="border p-2 text-center">PRECIO</th>
              <th className="border p-2 text-center">SUB-TOTAL</th>
              <th className="border p-2 text-center">- ACCIONES -</th>
            </tr>
          </thead>
          <tbody>
            {wishlist && wishlist.map(item => (
              <tr key={item.Id_Wish} className="border">
                <td className="border p-2 flex justify-center items-center"><img src={`https://localhost:8080/${item.Imagen}`} alt={item.Nombre_modelo} className="w-20 h-auto rounded-full" /></td>
                <td className="border p-2 text-center">{item.Nombre_modelo}</td>
                <td className="border p-2 text-center">{item.Talla}</td>
                <td className="border p-2 text-center">{item.Cantidad}</td>
                <td className="border p-2 text-center">{item.Precio}</td>
                <td className="border p-2 text-center">${item.Precio * item.Cantidad}</td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => openModal(item)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleRemove(item.Id_Wish)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <p className="text-2xl">TOTAL: ${calculateTotal()}</p>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button className="bg-yellow-500 text-white py-2 px-4 rounded" onClick={handleOrder}>
          Realizar pedido
        </button>
      </div>
    </div>

    {currentItem && (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Editar Artículo"
        className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl mb-4">Editar Artículo</h2>
          <div className="mb-4">
            <label className="block mb-1">Talla</label>
            <select
              value={currentItem.Talla}
              onChange={(e) => handleSizeChange(e.target.value)}
              className="border p-2 w-full rounded"
            >
              {sizes.map(sizeOption => (
                <option key={sizeOption} value={sizeOption}>{sizeOption}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Cantidad</label>
            <input
              type="number"
              value={currentItem.Cantidad}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="border p-2 w-full rounded"
              min="1"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleUpdate}
              className="bg-yellow-500 text-white py-2 px-4 rounded mr-2 hover:bg-yellow-600"
            >
              Confirmar
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    )}
  </div>

  );
};

export default Wishlist;
