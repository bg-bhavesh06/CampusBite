import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Clock, MapPin, Package } from 'lucide-react';

export default function OrderDone() {
  const { id } = useParams();
  return (
    <div className="page" style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ maxWidth:420, width:'100%', textAlign:'center' }}>
        <div style={{ position:'relative', width:100, height:100, margin:'0 auto 24px' }}>
          <div style={{ width:100, height:100, background:'#f0fdf4', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <CheckCircle size={48} color="#16a34a" />
          </div>
        </div>
        <h1 style={{ fontFamily:'Syne', fontSize:32, fontWeight:800, color:'#111827', marginBottom:6 }}>Order Placed! 🎉</h1>
        <p style={{ color:'#9ca3af', marginBottom:6 }}>Payment Successful</p>
        <p style={{ color:'#6b7280', fontSize:14, marginBottom:28 }}>
          Order ID: <span style={{ color:'#f97316', fontFamily:'monospace', fontWeight:700 }}>{id?.slice(-8).toUpperCase()}</span>
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:28 }}>
          {[
            { icon:Package, color:'#f97316', bg:'#fff7ed', title:'Order Confirmed', sub:'Your order is being prepared' },
            { icon:Clock, color:'#2563eb', bg:'#eff6ff', title:'Pickup at 5PM', sub:'Our team collects all orders' },
            { icon:MapPin, color:'#16a34a', bg:'#f0fdf4', title:'Delivered 7–9PM', sub:'Food arrives at your hostel door' },
          ].map(({ icon:I, color, bg, title, sub }) => (
            <div key={title} className="card" style={{ padding:16, display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:40, height:40, background:bg, borderRadius:11, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <I size={18} color={color} />
              </div>
              <div style={{ textAlign:'left' }}>
                <p style={{ fontWeight:600, color:'#111827', fontSize:14 }}>{title}</p>
                <p style={{ color:'#9ca3af', fontSize:13 }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <Link to="/my-orders" className="btn-white" style={{ flex:1, justifyContent:'center', padding:'11px' }}>My Orders</Link>
          <Link to="/home" className="btn-orange" style={{ flex:1, justifyContent:'center', padding:'11px' }}>Order More</Link>
        </div>
      </div>
    </div>
  );
}
