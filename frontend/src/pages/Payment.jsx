import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Smartphone, CreditCard, Building2, Shield, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { items, total, subtotal, delivery, clear } = useCart();
  const { user } = useAuth();
  const delivery_info = state?.delivery_info || { hostel: user?.hostel, roomNumber: user?.roomNumber };
  const [method, setMethod] = useState('upi');
  const [upi, setUpi] = useState('');
  const [card, setCard] = useState({ number:'', name:'', expiry:'', cvv:'' });
  const [processing, setProcessing] = useState(false);

  const pay = async () => {
    if (method === 'upi' && !upi) { toast.error('Enter UPI ID'); return; }
    if (method === 'card' && (!card.number || !card.name || !card.expiry || !card.cvv)) { toast.error('Fill all card details'); return; }
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2000));
    try {
      const orderData = {
        items: items.map(i => ({ stallId: i.stallId, stallName: i.stallName, itemName: i.name, itemPrice: i.price, quantity: i.qty })),
        hostel: delivery_info.hostel,
        roomNumber: delivery_info.roomNumber
      };
      const res = await axios.post('/api/orders', orderData);
      clear();
      toast.success('Payment Successful! 🎉');
      navigate(`/order-done/${res.data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order failed');
      setProcessing(false);
    }
  };

  const methods = [
    { id:'upi', icon:Smartphone, label:'UPI', desc:'Pay via UPI ID' },
    { id:'card', icon:CreditCard, label:'Card', desc:'Debit / Credit Card' },
    { id:'netbanking', icon:Building2, label:'Net Banking', desc:'Internet Banking' },
  ];

  return (
    <div className="page">
      <div style={{ maxWidth:480, margin:'0 auto', padding:'28px 20px' }}>
        <button onClick={() => navigate(-1)} style={{ display:'flex', alignItems:'center', gap:6, color:'#9ca3af', background:'none', border:'none', cursor:'pointer', marginBottom:20, fontSize:14 }}>
          <ArrowLeft size={15} /> Back to Cart
        </button>
        <h1 style={{ fontFamily:'Syne', fontSize:26, fontWeight:800, color:'#111827', marginBottom:4 }}>Payment</h1>
        <p style={{ color:'#9ca3af', fontSize:14, marginBottom:24 }}>Total: <span style={{ color:'#f97316', fontWeight:700 }}>₹{total}</span></p>

        {/* Order summary */}
        <div style={{ background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:14, padding:16, marginBottom:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'#6b7280', marginBottom:4 }}><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'#6b7280', marginBottom:8 }}><span>Delivery</span><span>₹{delivery}</span></div>
          <div style={{ display:'flex', justifyContent:'space-between', fontWeight:700 }}><span style={{ color:'#111827' }}>Total</span><span style={{ color:'#f97316', fontSize:18 }}>₹{total}</span></div>
        </div>

        {/* Payment methods */}
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:20 }}>
          {methods.map(({ id, icon:I, label, desc }) => (
            <button key={id} onClick={() => setMethod(id)} style={{ display:'flex', alignItems:'center', gap:14, padding:16, borderRadius:12, border: method===id ? '2px solid #f97316' : '1.5px solid #e5e7eb', background: method===id ? '#fff7ed' : '#fff', cursor:'pointer', textAlign:'left', transition:'all 0.15s' }}>
              <div style={{ width:40, height:40, background: method===id ? '#f97316' : '#f3f4f6', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <I size={18} color={method===id ? '#fff' : '#6b7280'} />
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontWeight:600, color:'#111827', fontSize:14 }}>{label}</p>
                <p style={{ color:'#9ca3af', fontSize:12 }}>{desc}</p>
              </div>
              <div style={{ width:18, height:18, borderRadius:'50%', border: method===id ? '2px solid #f97316' : '2px solid #d1d5db', display:'flex', alignItems:'center', justifyContent:'center' }}>
                {method===id && <div style={{ width:8, height:8, borderRadius:'50%', background:'#f97316' }} />}
              </div>
            </button>
          ))}
        </div>

        {/* UPI */}
        {method === 'upi' && (
          <div className="card" style={{ padding:18, marginBottom:20 }}>
            <label style={{ fontSize:13, fontWeight:600, color:'#374151', display:'block', marginBottom:8 }}>UPI ID</label>
            <input value={upi} onChange={e=>setUpi(e.target.value)} placeholder="yourname@upi" className="inp" />
            <p style={{ color:'#9ca3af', fontSize:12, marginTop:6 }}>e.g. 9876543210@paytm</p>
          </div>
        )}

        {/* Card */}
        {method === 'card' && (
          <div className="card" style={{ padding:18, marginBottom:20, display:'flex', flexDirection:'column', gap:12 }}>
            <div><label style={{ fontSize:13, fontWeight:600, color:'#374151', display:'block', marginBottom:6 }}>Card Number</label><input value={card.number} onChange={e=>setCard({...card,number:e.target.value.replace(/\D/g,'').slice(0,16)})} placeholder="1234 5678 9012 3456" className="inp" /></div>
            <div><label style={{ fontSize:13, fontWeight:600, color:'#374151', display:'block', marginBottom:6 }}>Cardholder Name</label><input value={card.name} onChange={e=>setCard({...card,name:e.target.value})} placeholder="Name on card" className="inp" /></div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <div><label style={{ fontSize:13, fontWeight:600, color:'#374151', display:'block', marginBottom:6 }}>Expiry</label><input value={card.expiry} onChange={e=>setCard({...card,expiry:e.target.value})} placeholder="MM/YY" className="inp" /></div>
              <div><label style={{ fontSize:13, fontWeight:600, color:'#374151', display:'block', marginBottom:6 }}>CVV</label><input type="password" value={card.cvv} onChange={e=>setCard({...card,cvv:e.target.value.slice(0,3)})} placeholder="•••" className="inp" /></div>
            </div>
          </div>
        )}

        {/* Net Banking */}
        {method === 'netbanking' && (
          <div className="card" style={{ padding:18, marginBottom:20 }}>
            <p style={{ color:'#6b7280', fontSize:14, marginBottom:12 }}>Select your bank:</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
              {['SBI','HDFC','ICICI','Axis','Kotak','PNB'].map(b => (
                <button key={b} style={{ padding:'10px', background:'#f9fafb', border:'1px solid #e5e7eb', borderRadius:8, fontSize:13, color:'#374151', cursor:'pointer' }}>{b}</button>
              ))}
            </div>
          </div>
        )}

        <div style={{ display:'flex', alignItems:'center', gap:6, color:'#9ca3af', fontSize:12, marginBottom:16 }}>
          <Shield size={13} /> Demo payment — no real transaction
        </div>

        <button onClick={pay} disabled={processing} className="btn-orange" style={{ width:'100%', justifyContent:'center', padding:'13px', fontSize:15 }}>
          {processing ? <><Loader size={16} style={{ animation:'spin 0.7s linear infinite' }} /> Processing...</> : `Pay ₹${total}`}
        </button>
      </div>
    </div>
  );
}
