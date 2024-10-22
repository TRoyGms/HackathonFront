import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProductProvider } from './context/ProductContext';
import { WishlistProvider } from './context/WishlistContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <ProductProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </ProductProvider>
  </React.StrictMode>
);
