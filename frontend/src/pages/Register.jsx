import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Utensils, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [hostel, setHostel] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async e => {
    e.preventDefault();
    if (mobile.length !== 10) { toast.error('Enter valid 10-digit mobile'); return; }
    if (password.length < 6) { toast.error('Password must be 6+ characters'); return; }
    if (!hostel.trim()) { toast.error('Enter hostel name'); return; }
    setLoading(true);
    try {
      await register({ name, mobile, password, hostel, roomNumber });
      toast.success('Welcome to CampusBite! 🎉');
      navigate('/home');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '72px 20px 32px' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: 18 }}>
            <div style={{ width: 38, height: 38, background: '#f97316', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Utensils size={18} color="#fff" />
            </div>
            <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 20, color: '#1a1a1a' }}>campus<span style={{ color: '#f97316' }}>bite</span></span>
          </Link>
          <h1 style={{ fontFamily: 'Syne', fontSize: 26, fontWeight: 800, color: '#111827', marginBottom: 6 }}>Create Account</h1>
          <p style={{ color: '#9ca3af', fontSize: 14 }}>Join CampusBite in 30 seconds</p>
        </div>

        <div className="card" style={{ padding: 28 }}>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your full name"
                className="inp"
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Mobile Number</label>
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Hostel Name</label>
                <input
                  type="text"
                  value={hostel}
                  onChange={e => setHostel(e.target.value)}
                  placeholder="e.g. Hostel 7"
                  className="inp"
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Room No.</label>
                <input
                  type="text"
                  value={roomNumber}
                  onChange={e => setRoomNumber(e.target.value)}
                  placeholder="e.g. 204"
                  className="inp"
                  required
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
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
                : 'Create Account'
              }
            </button>
          </form>

          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: 13, marginTop: 18 }}>
            Already registered?{' '}
            <Link to="/login" style={{ color: '#f97316', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
