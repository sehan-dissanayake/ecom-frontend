import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import { NavBar } from './components/NavBar';
import { ProductsPage } from './pages/ProductsPage';

function App() {
  return (
    <Router>
      <DataProvider>
        <NavBar />
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/" element={<ProductsPage />} />
        </Routes>
      </DataProvider>
    </Router>
  );
}

export default App;