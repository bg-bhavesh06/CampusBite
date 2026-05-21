import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AIChatbot from './components/ai/AIChatbot';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import StallMenu from './pages/StallMenu';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import OrderDone from './pages/OrderDone';
import Orders from './pages/Orders';
import About from './pages/About';
import AdminDashboard from './pages/admin/Dashboard';
import AdminStalls from './pages/admin/Stalls';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';

const Loader = () => (
  <div style={{ minHeight:'100vh', background:'#f5f5f5', display:'flex', alignItems:'center', justifyContent:'center' }}>
    <div className="spin" />
  </div>
);

const Guard = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  return user ? children : <Navigate to="/login" />;
};

const AdminGuard = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  return user?.isAdmin ? children : <Navigate to="/home" />;
};

// ✅ Fix: useLocation() inside Router so pathname updates correctly
const Layout = ({ children }) => {
  const { user } = useAuth();
  const { pathname } = useLocation(); // ✅ React Router hook - updates on navigation
  const isAdmin = user?.isAdmin;
  const noNav = ['/', '/login', '/register'].includes(pathname);

  return (
    <div style={{ minHeight:'100vh', background:'#f5f5f5', display:'flex', flexDirection:'column' }}>
      {!isAdmin && !noNav && <Navbar />}
      <main style={{ flex:1 }}>{children}</main>
      {!isAdmin && !noNav && <Footer />}
      {user && !isAdmin && <AIChatbot />}
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background:'#fff', color:'#1a1a1a', border:'1px solid #e5e7eb', boxShadow:'0 4px 12px rgba(0,0,0,0.08)' },
          success: { iconTheme: { primary:'#f97316', secondary:'#fff' } }
        }}
      />
    </div>
  );
};

const AppRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Guard><Home /></Guard>} />
      <Route path="/stall/:id" element={<Guard><StallMenu /></Guard>} />
      <Route path="/cart" element={<Guard><Cart /></Guard>} />
      <Route path="/payment" element={<Guard><Payment /></Guard>} />
      <Route path="/order-done/:id" element={<Guard><OrderDone /></Guard>} />
      <Route path="/my-orders" element={<Guard><Orders /></Guard>} />
      <Route path="/about" element={<About />} />
      <Route path="/admin" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
      <Route path="/admin/stalls" element={<AdminGuard><AdminStalls /></AdminGuard>} />
      <Route path="/admin/orders" element={<AdminGuard><AdminOrders /></AdminGuard>} />
      <Route path="/admin/users" element={<AdminGuard><AdminUsers /></AdminGuard>} />
    </Routes>
  </Layout>
);

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
