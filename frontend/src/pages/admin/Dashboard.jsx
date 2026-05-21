import { useState, useEffect } from 'react';
import { ShoppingBag, Users, TrendingUp, Store, Download } from 'lucide-react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([axios.get('/api/admin/stats'), axios.get('/api/admin/orders/today')])
      .then(([s,o]) => { setStats(s.data); setOrders(o.data.slice(0,8)); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const dlExcel = async () => {
    try {
      const r = await axios.get('/api/admin/orders/export', { responseType:'blob' });
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(new Blob([r.data]));
      a.download = `orders_${new Date().toISOString().split('T')[0]}.xlsx`;
      a.click(); toast.success('Downloaded!');
    } catch { toast.error('Failed'); }
  };

  const CARDS = stats ? [
    { label:"Today's Orders", val:stats.todayOrders, I:ShoppingBag, c:'#f97316', bg:'#fff7ed' },
    { label:"Today's Revenue", val:`₹${stats.todayRevenue}`, I:TrendingUp, c:'#16a34a', bg:'#f0fdf4' },
    { label:"Total Users", val:stats.totalUsers, I:Users, c:'#2563eb', bg:'#eff6ff' },
    { label:"Hostels Today", val:stats.activeHostels, I:Store, c:'#9333ea', bg:'#faf5ff' },
  ] : [];

  return (
    <AdminLayout title="Dashboard">
      {loading ? <div style={{ display:'flex', justifyContent:'center', padding:60 }}><div className="spin" /></div> : (
        <>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:14, marginBottom:24 }}>
            {CARDS.map(({ label,val,I,c,bg }) => (
              <div key={label} className="card" style={{ padding:18 }}>
                <div style={{ width:38, height:38, background:bg, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 }}><I size={17} color={c} /></div>
                <p style={{ fontFamily:'Syne', fontSize:26, fontWeight:800, color:'#111827', lineHeight:1 }}>{val}</p>
                <p style={{ color:'#9ca3af', fontSize:13, marginTop:5 }}>{label}</p>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
            <h2 style={{ fontFamily:'Syne', fontSize:16, fontWeight:700, color:'#111827' }}>Today's Orders</h2>
            <button onClick={dlExcel} className="btn-orange" style={{ padding:'7px 14px', fontSize:13 }}><Download size={13} /> Excel</button>
          </div>
          <div className="card" style={{ overflow:'hidden' }}>
            {orders.length === 0 ? (
              <div style={{ textAlign:'center', padding:'40px 20px', color:'#9ca3af' }}><ShoppingBag size={32} style={{ margin:'0 auto 10px', opacity:0.3 }} /><p>No orders today</p></div>
            ) : (
              <div style={{ overflowX:'auto' }}>
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom:'1px solid #f3f4f6' }}>
                      {['ID','Student','Hostel','Items','Total','Time'].map(h => (
                        <th key={h} style={{ textAlign:'left', padding:'11px 16px', color:'#9ca3af', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', whiteSpace:'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o._id} style={{ borderBottom:'1px solid #f9fafb' }}
                        onMouseEnter={e=>e.currentTarget.style.background='#fafafa'} onMouseLeave={e=>e.currentTarget.style.background=''}>
                        <td style={{ padding:'12px 16px', color:'#f97316', fontFamily:'monospace', fontSize:13, fontWeight:700 }}>#{o._id.slice(-6).toUpperCase()}</td>
                        <td style={{ padding:'12px 16px', color:'#111827', fontSize:14 }}>{o.studentName}</td>
                        <td style={{ padding:'12px 16px', color:'#6b7280', fontSize:13 }}>{o.hostel} · Rm {o.roomNumber}</td>
                        <td style={{ padding:'12px 16px', color:'#6b7280', fontSize:13 }}>{o.items?.length}</td>
                        <td style={{ padding:'12px 16px', color:'#f97316', fontWeight:700 }}>₹{o.totalAmount}</td>
                        <td style={{ padding:'12px 16px', color:'#9ca3af', fontSize:12 }}>{new Date(o.createdAt).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  );
}
