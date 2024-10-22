


import{ createContext, useState, useContext } from 'react';

const WishlistContext = createContext();

export const useWishlistContext = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product, size, quantity) => {
    const newWishlistItem = { ...product, size, quantity };
    setWishlist(prevWishlist => [...prevWishlist, newWishlistItem]);
  };

  const updateWishlistItem = (updatedItem) => {
    setWishlist(prevWishlist =>
      prevWishlist.map(item =>
        item.Folio_producto === updatedItem.Folio_producto ? updatedItem : item
      )
    );
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.Folio_producto !== productId));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, updateWishlistItem, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};