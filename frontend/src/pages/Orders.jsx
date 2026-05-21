import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exp, setExp] = useState(null);

  useEffect(() => {
    axios.get('/api/orders/my-orders').then(r => { setOrders(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <div style={{ maxWidth:680, margin:'0 auto', padding:'28px 20px' }}>
        <h1 style={{ fontFamily:'Syne', fontSize:26, fontWeight:800, color:'#111827', marginBottom:24 }}>My Orders</h1>
        {loading ? (
          <div style={{ display:'flex', justifyContent:'center', padding:60 }}><div className="spin" /></div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 20px' }}>
            <Package size={52} color="#e5e7eb" style={{ margin:'0 auto 14px' }} />
            <h2 style={{ fontFamily:'Syne', fontSize:20, color:'#111827', marginBottom:8 }}>No orders yet</h2>
            <p style={{ color:'#9ca3af', marginBottom:20 }}>Start ordering from our stalls!</p>
            <Link to="/home" className="btn-orange">Browse Stalls</Link>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {orders.map(o => (
              <div key={o._id} className="card" style={{ overflow:'hidden' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', cursor:'pointer' }}
                  onClick={() => setExp(exp===o._id ? null : o._id)}>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <div style={{ width:38, height:38, background:'#f0fdf4', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <CheckCircle size={17} color="#16a34a" />
                    </div>
                    <div>
                      <p style={{ fontWeight:600, color:'#111827', fontSize:14 }}>#{o._id.slice(-6).toUpperCase()}</p>
                      <p style={{ color:'#9ca3af', fontSize:13 }}>{o.items?.length} items · ₹{o.totalAmount}</p>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ textAlign:'right' }}>
                      <span className="badge-green" style={{ fontSize:11 }}>{o.paymentStatus}</span>
                      <p style={{ color:'#9ca3af', fontSize:11, marginTop:2 }}>{new Date(o.createdAt).toLocaleDateString('en-IN')}</p>
                    </div>
                    {exp===o._id ? <ChevronUp size={14} color="#9ca3af" /> : <ChevronDown size={14} color="#9ca3af" />}
                  </div>
                </div>
                {exp===o._id && (
                  <div style={{ borderTop:'1px solid #f3f4f6', padding:'14px 18px', background:'#fafafa' }}>
                    <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:10, padding:'10px 14px', marginBottom:12 }}>
                      <p style={{ color:'#9ca3af', fontSize:11, marginBottom:2 }}>Delivery</p>
                      <p style={{ color:'#111827', fontSize:14 }}>{o.hostel} · Room {o.roomNumber}</p>
                    </div>
                    {o.items?.map((item, i) => (
                      <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid #f3f4f6', fontSize:13 }}>
                        <span style={{ color:'#6b7280' }}>{item.itemName} <span style={{ color:'#9ca3af' }}>×{item.quantity}</span></span>
                        <span style={{ color:'#374151' }}>₹{item.itemPrice * item.quantity}</span>
                      </div>
                    ))}
                    <div style={{ display:'flex', justifyContent:'space-between', paddingTop:10, fontWeight:700 }}>
                      <span style={{ color:'#111827' }}>Total</span>
                      <span style={{ color:'#f97316', fontSize:16 }}>₹{o.totalAmount}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
