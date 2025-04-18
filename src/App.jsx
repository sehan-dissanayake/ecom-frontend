import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import { NavBar } from './components/NavBar';
import { ProductsPage } from './pages/ProductsPage';
import { OrdersPage } from './pages/OrdersPage';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <NotificationProvider>
    <Router>
      <DataProvider>
        <NavBar />
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/" element={<ProductsPage />} />
        </Routes>
      </DataProvider>
    </Router>
    </NotificationProvider>
  );
}

export default App;