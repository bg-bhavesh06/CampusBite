import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Store, ShoppingBag, Users, LogOut, Utensils, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const NAV = [
  { to:'/admin', icon:LayoutDashboard, label:'Dashboard' },
  { to:'/admin/stalls', icon:Store, label:'Food Stalls' },
  { to:'/admin/orders', icon:ShoppingBag, label:'Orders' },
  { to:'/admin/users', icon:Users, label:'Users' },
];

function Sidebar({ onClose }) {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div style={{ width:230, height:'100%', background:'#fff', borderRight:'1px solid #e5e7eb', display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'18px 18px 14px', borderBottom:'1px solid #e5e7eb', display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ width:32, height:32, background:'#f97316', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Utensils size={15} color="#fff" />
        </div>
        <div>
          <p style={{ fontFamily:'Syne', fontWeight:800, fontSize:15, color:'#111827', lineHeight:1 }}>CampusBite</p>
          <p style={{ color:'#f97316', fontSize:11, fontWeight:600 }}>Admin Panel</p>
        </div>
      </div>
      <nav style={{ flex:1, padding:10 }}>
        {NAV.map(({ to, icon:I, label }) => (
          <Link key={to} to={to} onClick={onClose} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px', borderRadius:9, marginBottom:2, textDecoration:'none', transition:'all 0.15s',
            background: pathname===to ? '#fff7ed' : 'transparent',
            color: pathname===to ? '#f97316' : '#6b7280',
            fontWeight: pathname===to ? 600 : 500, fontSize:14 }}>
            <I size={16} />{label}
          </Link>
        ))}
      </nav>
      <div style={{ padding:10, borderTop:'1px solid #e5e7eb' }}>
        <button onClick={() => { logout(); navigate('/'); }} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px', borderRadius:9, width:'100%', background:'none', border:'none', cursor:'pointer', color:'#ef4444', fontSize:14, fontWeight:500 }}>
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div style={{ minHeight:'100vh', background:'#f5f5f5', display:'flex', fontFamily:'Inter' }}>
      {/* Desktop */}
      <div style={{ position:'fixed', left:0, top:0, bottom:0, width:230, zIndex:30, display:'none' }} className="lg-sidebar">
        <Sidebar onClose={() => {}} />
      </div>
      <style>{`@media(min-width:1024px){.lg-sidebar{display:block!important}}`}</style>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div style={{ position:'fixed', inset:0, zIndex:50, display:'flex' }}>
          <div style={{ width:230 }}><Sidebar onClose={() => setSidebarOpen(false)} /></div>
          <div style={{ flex:1, background:'rgba(0,0,0,0.3)' }} onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div style={{ flex:1, marginLeft:0 }} className="admin-main">
        <style>{`@media(min-width:1024px){.admin-main{margin-left:230px!important}}`}</style>
        <div style={{ position:'sticky', top:0, zIndex:20, background:'#fff', borderBottom:'1px solid #e5e7eb', height:54, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <button onClick={() => setSidebarOpen(true)} style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', background:'#f9fafb', border:'1px solid #e5e7eb', borderRadius:8, cursor:'pointer' }} className="lg-hide">
              <Menu size={15} color="#374151" />
            </button>
            <style>{`@media(min-width:1024px){.lg-hide{display:none!important}}`}</style>
            <h1 style={{ fontFamily:'Syne', fontSize:17, fontWeight:700, color:'#111827' }}>{title}</h1>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} style={{
            width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 8, cursor: 'pointer'
          }} title="Logout">
            <LogOut size={14} color="#ef4444" />
          </button>
        </div>
        <div style={{ padding:20 }}>{children}</div>
      </div>
    </div>
  );
}
