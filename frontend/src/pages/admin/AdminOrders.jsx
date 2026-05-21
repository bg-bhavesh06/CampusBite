import { useState, useEffect } from 'react';
import { Download, ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import toast from 'react-hot-toast';

export default function AdminOrders() {
  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(true);
  const [date,setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hostel,setHostel] = useState('');
  const [exp,setExp] = useState(null);

  useEffect(()=>{ fetchOrders(); },[date,hostel]);

  const fetchOrders = () => {
    setLoading(true);
    const p = {}; if(date) p.date=date; if(hostel) p.hostel=hostel;
    axios.get('/api/admin/orders',{params:p}).then(r=>{setOrders(r.data);setLoading(false);}).catch(()=>setLoading(false));
  };

  const dl = async () => {
    try {
      const r = await axios.get('/api/admin/orders/export',{params:date?{date}:{},responseType:'blob'});
      const a = document.createElement('a'); a.href=window.URL.createObjectURL(new Blob([r.data])); a.download=`orders_${date||'all'}.xlsx`; a.click();
      toast.success('Downloaded!');
    } catch { toast.error('Failed'); }
  };

  const inp = { background:'#fff', border:'1.5px solid #e5e7eb', borderRadius:9, padding:'8px 13px', color:'#1a1a1a', fontSize:14, outline:'none', fontFamily:'Inter', height:40 };

  return (
    <AdminLayout title="Orders">
      <div style={{ display:'flex', alignItems:'flex-end', gap:12, marginBottom:22, flexWrap:'wrap' }}>
        <div><label style={{ fontSize:12, fontWeight:600, color:'#374151', display:'block', marginBottom:5 }}>Date</label><input type="date" value={date} onChange={e=>setDate(e.target.value)} style={inp}/></div>
        <div><label style={{ fontSize:12, fontWeight:600, color:'#374151', display:'block', marginBottom:5 }}>Hostel</label><input value={hostel} onChange={e=>setHostel(e.target.value)} placeholder="Filter by hostel..." style={{...inp,width:200}}/></div>
        <button onClick={dl} className="btn-orange" style={{ padding:'0 16px', height:40, fontSize:13 }}><Download size={13}/> Excel</button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:20 }}>
        {[['Total Orders',orders.length,'#f97316'],['Revenue',`₹${orders.reduce((s,o)=>s+o.totalAmount,0)}`,'#16a34a']].map(([l,v,c])=>(
          <div key={l} className="card" style={{ padding:'15px 18px' }}>
            <p style={{ color:'#9ca3af', fontSize:13, marginBottom:4 }}>{l}</p>
            <p style={{ fontFamily:'Syne', fontSize:26, fontWeight:800, color:c }}>{v}</p>
          </div>
        ))}
      </div>

      {loading ? <div style={{ display:'flex',justifyContent:'center',padding:60 }}><div className="spin"/></div>
      : orders.length===0 ? <div className="card" style={{ padding:'50px 20px', textAlign:'center', color:'#9ca3af' }}><ShoppingBag size={32} style={{ margin:'0 auto 10px', opacity:0.3 }}/><p>No orders found</p></div>
      : (
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {orders.map(o=>(
            <div key={o._id} className="card" style={{ overflow:'hidden' }}>
              <div style={{ display:'flex', alignItems:'center', padding:'13px 16px', cursor:'pointer', gap:12 }} onClick={()=>setExp(exp===o._id?null:o._id)}>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(100px,1fr))', gap:12, flex:1 }}>
                  <div><p style={{ color:'#9ca3af', fontSize:11 }}>Order</p><p style={{ color:'#f97316', fontFamily:'monospace', fontSize:13, fontWeight:700 }}>#{o._id.slice(-6).toUpperCase()}</p></div>
                  <div><p style={{ color:'#9ca3af', fontSize:11 }}>Student</p><p style={{ color:'#111827', fontSize:13 }}>{o.studentName}</p></div>
                  <div><p style={{ color:'#9ca3af', fontSize:11 }}>Hostel</p><p style={{ color:'#6b7280', fontSize:13 }}>{o.hostel} · Rm {o.roomNumber}</p></div>
                  <div><p style={{ color:'#9ca3af', fontSize:11 }}>Total</p><p style={{ color:'#f97316', fontWeight:700, fontSize:14 }}>₹{o.totalAmount}</p></div>
                </div>
                {exp===o._id?<ChevronUp size={13} color="#9ca3af"/>:<ChevronDown size={13} color="#9ca3af"/>}
              </div>
              {exp===o._id && (
                <div style={{ borderTop:'1px solid #f3f4f6', padding:'13px 16px', background:'#fafafa' }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12, fontSize:13 }}>
                    <div><span style={{ color:'#9ca3af' }}>Mobile: </span><span style={{ color:'#374151' }}>{o.mobile}</span></div>
                    <div><span style={{ color:'#9ca3af' }}>Time: </span><span style={{ color:'#374151' }}>{new Date(o.createdAt).toLocaleTimeString('en-IN')}</span></div>
                  </div>
                  {o.items?.map((item,i)=>(
                    <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid #f3f4f6', fontSize:13 }}>
                      <span style={{ color:'#6b7280' }}>{item.stallName} — {item.itemName} <span style={{ color:'#9ca3af' }}>×{item.quantity}</span></span>
                      <span style={{ color:'#374151' }}>₹{item.itemPrice*item.quantity}</span>
                    </div>
                  ))}
                  <div style={{ display:'flex', justifyContent:'space-between', paddingTop:10, fontWeight:700 }}>
                    <span style={{ color:'#111827' }}>Total</span><span style={{ color:'#f97316', fontSize:16 }}>₹{o.totalAmount}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
