import { createContext, useContext, useState, useEffect } from 'react';
import { getProducts } from '../services/productService';
import { getOrders } from '../services/orderService';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  return (
    <DataContext.Provider value={{ products, orders, refreshProducts: loadProducts, refreshOrders: loadOrders }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);