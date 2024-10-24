import { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const addProduct = (product) => {
        setProducts(prevProducts => [...prevProducts, product]);
    };


    const editProduct = async (updatedProduct) => {
        try {
            const response = await fetch(`https://localhost:8080/api/productos/${updatedProduct.Folio_producto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  localStorage.getItem('authToken'),
                },
                body: JSON.stringify(updatedProduct),
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }
            setProducts(prevProducts => prevProducts.map(product => product.Folio_producto === updatedProduct.Folio_producto ? updatedProduct : product));
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    };

    // const deleteProduct = (productId) => {
    //     setProducts(prevProducts => prevProducts.filter(product => product.Folio_producto !== productId));
    // };

    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`https://localhost:8080/api/productos/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':  localStorage.getItem('authToken'),
                }
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el producto');
            }
            setProducts(prevProducts => prevProducts.filter(product => product.Folio_producto !== productId));
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
        console.log("Producto eliminado", {productId})
    };

    const getProductsByCategory = (category) => {
        return products.filter(product => product.Categoria === category);
    };

    return (
        <ProductContext.Provider value={{ products, setProducts, addProduct, editProduct, deleteProduct, getProductsByCategory }}>
            {children}
        </ProductContext.Provider>
    );
};
