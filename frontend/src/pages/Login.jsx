import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Utensils, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('user');
  const { login, logout } = useAuth();
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await login(mobile, password);
      
      if (role === 'admin' && !u.isAdmin) {
        logout();
        toast.error('You do not have Owner privileges');
        setLoading(false);
        return;
      }
      if (role === 'user' && u.isAdmin) {
        logout();
        toast.error('Please use the Owner Login tab');
        setLoading(false);
        return;
      }

      toast.success(`Welcome, ${u.name.split(' ')[0]}! 👋`);
      navigate(u.isAdmin ? '/admin' : '/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 20 }}>
            <div style={{ width: 38, height: 38, background: '#f97316', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Utensils size={18} color="#fff" />
            </div>
            <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 20, color: '#1a1a1a' }}>campus<span style={{ color: '#f97316' }}>bite</span></span>
          </Link>
          <h1 style={{ fontFamily: 'Syne', fontSize: 26, fontWeight: 800, color: '#111827', marginBottom: 6 }}>Welcome Back</h1>
          <p style={{ color: '#9ca3af', fontSize: 14 }}>
            {role === 'admin' ? 'Sign in to manage your stalls and orders.' : 'Sign in to order food and manage your cart.'}
          </p>
        </div>

        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: 12, padding: 4, marginBottom: 24 }}>
            <button
              type="button"
              onClick={() => setRole('user')}
              style={{
                flex: 1, padding: '10px 0', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                background: role === 'user' ? '#fff' : 'transparent', color: role === 'user' ? '#111827' : '#6b7280', boxShadow: role === 'user' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              User Login
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              style={{
                flex: 1, padding: '10px 0', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                background: role === 'admin' ? '#fff' : 'transparent', color: role === 'admin' ? '#111827' : '#6b7280', boxShadow: role === 'admin' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              Owner Login
            </button>
          </div>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Mobile Number</label>
              <input
                type="tel"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                placeholder="10-digit number"
                className="inp"
                required
                maxLength={10}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="inp"
                  style={{ paddingRight: 44 }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-orange"
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 15, marginTop: 4 }}
            >
              {loading
                ? <div className="spin" style={{ width: 18, height: 18, borderWidth: 2 }} />
                : 'Sign In'
              }
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 13, marginTop: 18 }}>
            No account?{' '}
            <Link to="/register" style={{ color: '#f97316', fontWeight: 600, textDecoration: 'none' }}>Register free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
