import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, LogOut, Menu, X, Utensils } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalQty } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Track screen size properly
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (to) => pathname === to;

  const handleLogout = () => {
    logout();
    navigate('/');
    setOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: 64, background: '#fff', borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 20px',
          height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>

          {/* Logo */}
          <Link to={user ? '/home' : '/'} style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 34, height: 34, background: '#f97316', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Utensils size={16} color="#fff" />
            </div>
            <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 18, color: '#1a1a1a' }}>
              campus<span style={{ color: '#f97316' }}>bite</span>
            </span>
          </Link>

          {/* Desktop links — shown only when NOT mobile */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {[['Food Stalls', '/home'], ['My Orders', '/my-orders'], ['About', '/about']].map(([label, to]) => (
                <Link key={to} to={to} style={{
                  padding: '7px 13px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                  textDecoration: 'none', transition: 'all 0.15s',
                  background: isActive(to) ? '#fff7ed' : 'transparent',
                  color: isActive(to) ? '#f97316' : '#6b7280',
                }}>
                  {label}
                </Link>
              ))}

              <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 8px' }} />

              {/* User chip — only if logged in */}
              {user && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '5px 12px', background: '#f9fafb',
                  border: '1px solid #e5e7eb', borderRadius: 999
                }}>
                  <div style={{ width: 26, height: 26, background: '#f97316', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{user.name?.[0]}</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>{user.name?.split(' ')[0]}</span>
                </div>
              )}

              {/* Cart */}
              <Link to="/cart" style={{
                position: 'relative', width: 38, height: 38,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#f9fafb', border: '1px solid #e5e7eb',
                borderRadius: 10, textDecoration: 'none', marginLeft: 4
              }}>
                <ShoppingCart size={17} color="#6b7280" />
                {totalQty > 0 && (
                  <span style={{
                    position: 'absolute', top: -4, right: -4, width: 18, height: 18,
                    background: '#f97316', color: '#fff', fontSize: 10, fontWeight: 700,
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '2px solid #fff'
                  }}>{totalQty}</span>
                )}
              </Link>

              {/* Logout */}
              {user && (
                <button onClick={handleLogout} style={{
                  width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 10, cursor: 'pointer', marginLeft: 4
                }}>
                  <LogOut size={15} color="#ef4444" />
                </button>
              )}
            </div>
          )}

          {/* Burger — shown only on mobile AND only when logged in */}
          {isMobile && user && (
            <button
              onClick={() => setOpen(!open)}
              style={{
                width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 9, cursor: 'pointer'
              }}
            >
              {open ? <X size={18} color="#374151" /> : <Menu size={18} color="#374151" />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile drawer */}
      {isMobile && open && user && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 49,
          background: '#fff', borderBottom: '2px solid #e5e7eb',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
        }}>
          {/* User info */}
          <div style={{
            margin: '12px 16px 4px', padding: '12px 14px',
            background: '#fff7ed', border: '1px solid #fed7aa',
            borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12
          }}>
            <div style={{
              width: 40, height: 40, background: '#f97316', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <span style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>{user.name?.[0]}</span>
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: '#1a1a1a' }}>{user.name}</p>
              <p style={{ color: '#9ca3af', fontSize: 12 }}>{user.hostel} · Room {user.roomNumber}</p>
            </div>
          </div>

          <div style={{ padding: '8px 16px' }}>
            {[
              ['🍴', 'Food Stalls', '/home'],
              ['📦', 'My Orders', '/my-orders'],
              ['ℹ️', 'About', '/about'],
            ].map(([icon, label, to]) => (
              <Link key={to} to={to} onClick={() => setOpen(false)} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', borderRadius: 10, textDecoration: 'none',
                marginBottom: 4, fontSize: 15, fontWeight: 500,
                background: isActive(to) ? '#fff7ed' : 'transparent',
                color: isActive(to) ? '#f97316' : '#374151',
              }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                {label}
              </Link>
            ))}

            <Link to="/cart" onClick={() => setOpen(false)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 14px', borderRadius: 10, textDecoration: 'none',
              marginBottom: 4, fontSize: 15, fontWeight: 500, color: '#374151'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 18 }}>🛒</span> My Cart
              </div>
              {totalQty > 0 && (
                <span style={{ background: '#f97316', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999 }}>
                  {totalQty}
                </span>
              )}
            </Link>

            <div style={{ height: 1, background: '#e5e7eb', margin: '8px 0' }} />

            <button onClick={handleLogout} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px', borderRadius: 10, background: '#fff5f5',
              border: 'none', cursor: 'pointer', fontSize: 15, fontWeight: 500,
              color: '#ef4444', marginBottom: 8
            }}>
              <span style={{ fontSize: 18 }}>🚪</span> Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
