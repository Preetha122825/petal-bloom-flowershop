import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { getMe } from './redux/authSlice';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage       from './pages/Home';
import AboutPage      from './pages/About';
import CollectionPage from './pages/Collection';
import ShopPage       from './pages/Shop';
import ProductPage    from './pages/ProductDetail';
import CartPage       from './pages/Cart';
import CheckoutPage   from './pages/Checkout';
import ContactPage    from './pages/Contact';
import LoginPage      from './pages/Auth/Login';
import RegisterPage   from './pages/Auth/Register';
import DashboardPage  from './pages/Dashboard';
import AdminLoginPage from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';

const PrivateRoute = ({ children }) => {
  const { token } = useSelector(s => s.auth);
  return token ? children : <Navigate to="/login" />;
};
const AdminRoute = ({ children }) => {
  const { user } = useSelector(s => s.auth);
  return user?.role === 'admin' ? children : <Navigate to="/admin/login" />;
};

function App() {
  const dispatch = useDispatch();
  useEffect(() => { if (localStorage.getItem('token')) dispatch(getMe()); }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} toastStyle={{ fontFamily: 'DM Sans, sans-serif' }} />
      <Routes>
        {/* Public */}
        <Route path="/" element={<><Navbar/><HomePage/><Footer/></>} />
        <Route path="/about"      element={<><Navbar/><AboutPage/><Footer/></>} />
        <Route path="/collection" element={<><Navbar/><CollectionPage/><Footer/></>} />
        <Route path="/shop"       element={<><Navbar/><ShopPage/><Footer/></>} />
        <Route path="/shop/:id"   element={<><Navbar/><ProductPage/><Footer/></>} />
        <Route path="/cart"       element={<><Navbar/><CartPage/><Footer/></>} />
        <Route path="/contact"    element={<><Navbar/><ContactPage/><Footer/></>} />
        <Route path="/login"      element={<LoginPage/>} />
        <Route path="/register"   element={<RegisterPage/>} />
        {/* Protected */}
        <Route path="/checkout"   element={<PrivateRoute><Navbar/><CheckoutPage/><Footer/></PrivateRoute>} />
        <Route path="/dashboard/*" element={<PrivateRoute><Navbar/><DashboardPage/><Footer/></PrivateRoute>} />
        {/* Admin */}
        <Route path="/admin/login" element={<AdminLoginPage/>} />
        <Route path="/admin/*"     element={<AdminRoute><AdminDashboard/></AdminRoute>} />
      </Routes>
    </>
  );
}

export default App;
