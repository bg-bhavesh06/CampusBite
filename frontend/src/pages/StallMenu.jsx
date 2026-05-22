import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Star, Clock, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function StallMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { add, setQty, items } = useCart();
  const [stall, setStall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState('All');

  useEffect(() => {
    axios.get(`/api/stalls/${id}`).then(r => { setStall(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}><div className="spin" /></div>;
  if (!stall) return <div className="page" style={{ display:'flex', alignItems:'center', justifyContent:'center', color:'#9ca3af' }}>Stall not found</div>;

  const cats = ['All', ...new Set(stall.menu.map(i => i.category))];
  const list = activeCat === 'All' ? stall.menu : stall.menu.filter(i => i.category === activeCat);
  const cartTotal = items.reduce((s, i) => s + i.qty, 0);
  const getCI = itemId => items.find(i => i.itemId === itemId);

  const handleAdd = item => { 
    if (!user) {
      toast('Please sign in to order', { icon: '🔒' });
      navigate('/login');
      return;
    }
    add(item, stall); 
    toast.success(`${item.name} added!`, { icon:'🛒' }); 
  };

  return (
    <div className="page">
      {/* Hero */}
      <div style={{ position:'relative', height:220, overflow:'hidden' }}>
        <img src={stall.image} alt={stall.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />
        <button onClick={() => navigate(-1)} style={{ position:'absolute', top:16, left:16, width:36, height:36, background:'rgba(255,255,255,0.9)', border:'none', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
          <ArrowLeft size={17} color="#374151" />
        </button>
        <div style={{ position:'absolute', bottom:18, left:22, right:22 }}>
          <h1 style={{ fontFamily:'Syne', fontSize:28, fontWeight:800, color:'#fff', marginBottom:5 }}>{stall.name}</h1>
          <div style={{ display:'flex', gap:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:4 }}><Star size={12} fill="#fbbf24" color="#fbbf24" /><span style={{ color:'#fff', fontSize:13 }}>{stall.rating}</span></div>
            <div style={{ display:'flex', alignItems:'center', gap:4, color:'rgba(255,255,255,0.8)', fontSize:13 }}><Clock size={12} />{stall.deliveryTime}</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:700, margin:'0 auto', padding:'18px 20px 120px' }}>
        {/* Category tabs */}
        <div style={{ display:'flex', gap:8, overflowX:'auto', marginBottom:18, paddingBottom:2 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} style={{ flexShrink:0, padding:'6px 16px', borderRadius:8, fontSize:13, fontWeight:500, cursor:'pointer', border:'none', transition:'all 0.15s',
              background: activeCat===c ? '#f97316' : '#fff', color: activeCat===c ? '#fff' : '#6b7280',
              boxShadow: activeCat===c ? '0 2px 8px rgba(249,115,22,0.2)' : '0 1px 3px rgba(0,0,0,0.06)' }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {list.filter(i => i.isAvailable).map(item => {
            const ci = getCI(item._id);
            return (
              <div key={item._id} className="card" style={{ padding:'14px 18px', display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <h3 style={{ color:'#111827', fontWeight:600, fontSize:15, marginBottom:3 }}>{item.name}</h3>
                  <p style={{ color:'#9ca3af', fontSize:13, marginBottom:6 }}>{item.description}</p>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontFamily:'Syne', fontWeight:700, fontSize:17, color:'#f97316' }}>₹{item.price}</span>
                    <span style={{ color:'#d1d5db', fontSize:12 }}>+ ₹5 delivery</span>
                  </div>
                </div>
                <div style={{ flexShrink:0 }}>
                  {ci ? (
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <button onClick={() => setQty(item._id, ci.qty - 1)} style={{ width:32, height:32, background:'#f9fafb', border:'1.5px solid #e5e7eb', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                        <Minus size={13} color="#6b7280" />
                      </button>
                      <span style={{ fontWeight:700, width:20, textAlign:'center', color:'#111827' }}>{ci.qty}</span>
                      <button onClick={() => handleAdd(item)} style={{ width:32, height:32, background:'#f97316', border:'none', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                        <Plus size={13} color="#fff" />
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => handleAdd(item)} className="btn-orange" style={{ padding:'7px 14px' }}>
                      <Plus size={13} /> Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {cartTotal > 0 && (
        <div style={{ position:'fixed', bottom:20, left:'50%', transform:'translateX(-50%)', zIndex:40, width:'90%', maxWidth:420 }}>
          <button onClick={() => navigate('/cart')} style={{ width:'100%', background:'#f97316', color:'#fff', border:'none', borderRadius:14, padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', boxShadow:'0 8px 24px rgba(249,115,22,0.35)', fontFamily:'Inter', fontSize:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}><ShoppingCart size={17} /><span style={{ fontWeight:600 }}>{cartTotal} items in cart</span></div>
            <span style={{ fontWeight:600 }}>View Cart →</span>
          </button>
        </div>
      )}
    </div>
  );
}
