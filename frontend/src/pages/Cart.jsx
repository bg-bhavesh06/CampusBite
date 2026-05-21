import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Edit3, Check, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Cart() {
  const { items, remove, setQty, subtotal, delivery, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [delivery_info, setDeliveryInfo] = useState({ hostel: user?.hostel || '', roomNumber: user?.roomNumber || '' });
  const [tmpHostel, setTmpHostel] = useState(delivery_info.hostel || "");
  const [tmpRoom, setTmpRoom] = useState(delivery_info.roomNumber || "");

  if (items.length === 0) return (
    <div className="page" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ textAlign:'center' }}>
        <ShoppingBag size={52} color="#e5e7eb" style={{ margin:'0 auto 16px' }} />
        <h2 style={{ fontFamily:'Syne', fontSize:22, color:'#111827', marginBottom:8 }}>Cart is empty</h2>
        <p style={{ color:'#9ca3af', marginBottom:20 }}>Add food from our stalls!</p>
        <Link to="/home" className="btn-orange">Browse Stalls</Link>
      </div>
    </div>
  );

  const grouped = items.reduce((acc, item) => { if (!acc[item.stallName]) acc[item.stallName] = []; acc[item.stallName].push(item); return acc; }, {});

  const proceed = () => {
    if (!delivery_info.hostel || !delivery_info.roomNumber) { toast.error('Enter delivery details'); setEditing(true); return; }
    navigate('/payment', { state: { delivery_info } });
  };

  return (
    <div className="page">
      <div style={{ maxWidth:680, margin:'0 auto', padding:'28px 20px' }}>
        <button onClick={() => navigate(-1)} style={{ display:'flex', alignItems:'center', gap:6, color:'#9ca3af', background:'none', border:'none', cursor:'pointer', marginBottom:20, fontSize:14 }}>
          <ArrowLeft size={15} /> Back
        </button>
        <h1 style={{ fontFamily:'Syne', fontSize:26, fontWeight:800, color:'#111827', marginBottom:24 }}>Your Cart</h1>

        {/* Items grouped by stall */}
        <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:20 }}>
          {Object.entries(grouped).map(([stallName, stallItems]) => (
            <div key={stallName} className="card" style={{ overflow:'hidden' }}>
              <div style={{ background:'#fff7ed', borderBottom:'1px solid #fed7aa', padding:'10px 18px', display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:14 }}>🍴</span>
                <span style={{ color:'#ea580c', fontWeight:600, fontSize:14 }}>{stallName}</span>
              </div>
              {stallItems.map(item => (
                <div key={item.itemId} style={{ display:'flex', alignItems:'center', padding:'14px 18px', borderBottom:'1px solid #f9fafb', gap:12 }}>
                  <div style={{ flex:1 }}>
                    <p style={{ color:'#111827', fontWeight:500, fontSize:14 }}>{item.name}</p>
                    <p style={{ color:'#9ca3af', fontSize:12, marginTop:2 }}>₹{item.price} + ₹5 delivery</p>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <button onClick={() => setQty(item.itemId, item.qty - 1)} style={{ width:28, height:28, background:'#f9fafb', border:'1px solid #e5e7eb', borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><Minus size={11} color="#6b7280" /></button>
                    <span style={{ fontWeight:600, width:18, textAlign:'center', fontSize:14 }}>{item.qty}</span>
                    <button onClick={() => setQty(item.itemId, item.qty + 1)} style={{ width:28, height:28, background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}><Plus size={11} color="#f97316" /></button>
                    <button onClick={() => remove(item.itemId)} style={{ width:28, height:28, background:'#fef2f2', border:'1px solid #fecaca', borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', marginLeft:4 }}><Trash2 size={11} color="#ef4444" /></button>
                  </div>
                  <p style={{ fontWeight:600, fontSize:14, color:'#111827', minWidth:52, textAlign:'right' }}>₹{item.price * item.qty}</p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Delivery Details */}
        <div className="card" style={{ padding:20, marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
            <h3 style={{ fontWeight:600, color:'#111827', fontSize:15 }}>Delivery Details</h3>
            {!editing
              ? <button onClick={() => { setTmpHostel(delivery_info.hostel||""); setTmpRoom(delivery_info.roomNumber||""); setEditing(true); }} style={{ display:'flex', alignItems:'center', gap:5, color:'#f97316', background:'none', border:'none', cursor:'pointer', fontSize:13, fontWeight:500 }}><Edit3 size={13}/> Edit</button>
              : <div style={{ display:'flex', gap:10 }}>
                  <button onClick={() => { setDeliveryInfo({hostel:tmpHostel, roomNumber:tmpRoom}); setEditing(false); toast.success('Updated!'); }} style={{ display:'flex', alignItems:'center', gap:4, color:'#16a34a', background:'none', border:'none', cursor:'pointer', fontSize:13, fontWeight:500 }}><Check size={12}/> Save</button>
                  <button onClick={() => setEditing(false)} style={{ color:'#9ca3af', background:'none', border:'none', cursor:'pointer', fontSize:13 }}>Cancel</button>
                </div>
            }
          </div>
          {editing ? (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <div>
                <label style={{ fontSize:12, fontWeight:600, color:'#6b7280', display:'block', marginBottom:5 }}>Hostel</label>
                <input value={tmpHostel} onChange={e => setTmpHostel(e.target.value)} placeholder="e.g. Hostel 7" className="inp" />
              </div>
              <div>
                <label style={{ fontSize:12, fontWeight:600, color:'#6b7280', display:'block', marginBottom:5 }}>Room Number</label>
                <input value={tmpRoom} onChange={e => setTmpRoom(e.target.value)} placeholder="e.g. 204" className="inp" />
              </div>
              <p style={{ color:'#9ca3af', fontSize:12 }}>⚠️ This change is for this order only</p>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {[['Name',user?.name],['Mobile',user?.mobile],['Hostel',delivery_info.hostel],['Room',delivery_info.roomNumber]].map(([k,v]) => (
                <div key={k} style={{ background:'#f9fafb', borderRadius:10, padding:'10px 12px' }}>
                  <p style={{ color:'#9ca3af', fontSize:11, marginBottom:2 }}>{k}</p>
                  <p style={{ color:'#111827', fontSize:14, fontWeight:500 }}>{v}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bill */}
        <div className="card" style={{ padding:20, marginBottom:20 }}>
          <h3 style={{ fontWeight:600, color:'#111827', fontSize:15, marginBottom:14 }}>Bill Summary</h3>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'#6b7280' }}><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'#6b7280' }}><span>Delivery ({items.length} × ₹5)</span><span>₹{delivery}</span></div>
            <div style={{ borderTop:'1px solid #e5e7eb', paddingTop:10, marginTop:4, display:'flex', justifyContent:'space-between' }}>
              <span style={{ fontWeight:700, fontSize:16, color:'#111827' }}>Total</span>
              <span style={{ fontWeight:700, fontSize:18, color:'#f97316' }}>₹{total}</span>
            </div>
          </div>
        </div>

        <button onClick={proceed} className="btn-orange" style={{ width:'100%', justifyContent:'center', padding:'13px', fontSize:15 }}>
          Proceed to Payment · ₹{total}
        </button>
      </div>
    </div>
  );
}
