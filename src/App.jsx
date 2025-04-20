import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider } from "./contexts/DataContext";
import { NavBar } from "./components/NavBar";
import { ProductsPage } from "./pages/ProductsPage";
import { OrdersPage } from "./pages/OrdersPage";
import { NotificationProvider } from "./contexts/NotificationContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <DataProvider>
            <NavBar />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<ProductsPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </DataProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
