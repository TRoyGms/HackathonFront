
import { useProductContext } from '../../context/ProductContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function ProductCardAdmin({ product }) {
  const { deleteProduct } = useProductContext();
  const navigate = useNavigate();

  const handleDelete = () => {
    Swal.fire({
      title: '¿Está seguro de eliminar este producto?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(product.Folio_producto);
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        );
      }
    });
  };

  return (
    <div className="border grid justify-center w-64 p-4 rounded-lg shadow-2xl bg-white mt-6 mb-5 transform transition-transform duration-300 hover:scale-110">
      <img src={`https://localhost:8080/api/productos/${product.Imagen}`} alt={product.Nombre_modelo} className="rounded-3xl h-48 object-contain mb-2" />
      <h3 className="text-xl font-bold text-center">{product.Nombre_modelo}</h3>
      <p>${product.Precio}</p>
      <p>{product.Categoria}</p>
      <p>{product.Marca}</p>
      <div className="flex justify-between mt-4">
        <button onClick={() => navigate(`/EditarProducto/${product.Folio_producto}`)} className="bg-black text-white py-2 px-4 rounded hover:bg-yellow-500 hover:text-black rounded-lg">
          Editar
        </button>
        <button onClick={handleDelete} className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-600 rounded-lg">
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ProductCardAdmin;
