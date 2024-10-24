
import { useNavigate } from 'react-router-dom';

const ProductCardClient = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div className="border grid justify-center p-4 rounded-lg bg-white hover:bg-gray-300 text-black w-64 transform transition-transform duration-300 hover:scale-110" onClick={() => navigate(`/product/${product.Folio_producto}`)}>
            {product.Imagen && (
                <img src={`https://localhost:8080/${product.Imagen}`} alt={product.Nombre_modelo} className="rounded-3xl h-48 object-contain mb-2" />
            )}
            <h3 className="text-xl font-bold">{product.Nombre_modelo}</h3>
            <p>{product.Categoria}</p>
            <p>${product.Precio}</p>
        </div>
    );
};

export default ProductCardClient;
