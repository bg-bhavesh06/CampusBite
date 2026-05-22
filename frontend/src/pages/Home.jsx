import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Clock, Lock, ShoppingCart, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const CATS = ['All','Pizza','Indian','Street Food','Desserts','Healthy','Chinese','Drinks','Bakery','South Indian','Gujarati'];

export default function Home() {
  const { user } = useAuth();
  const { totalQty, total } = useCart();
  const [stalls, setStalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');

  useEffect(() => {
    axios.get('/api/stalls').then(r => { setStalls(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const list = stalls.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) && (cat === 'All' || s.category === cat));
  const open = () => { const h = new Date().getHours(); return h >= 8 && h < 17; };

  return (
    <div className="page">
      {/* Header */}
      <div style={{ background:'#fff', borderBottom:'1px solid #e5e7eb', padding:'22px 20px 18px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:16, marginBottom:16, flexWrap:'wrap' }}>
            <div>
              <p style={{ color:'#f97316', fontSize:13, fontWeight:500, marginBottom:3 }}>{user ? `Hello, ${user.name?.split(' ')[0]} 👋` : 'Hello, Guest 👋'}</p>
              <h1 style={{ fontFamily:'Syne', fontSize:'clamp(20px,3.5vw,28px)', fontWeight:800, color:'#111827', marginBottom:10 }}>
                What are you craving today?
              </h1>
              <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' }}>
                <span className={open() ? 'badge-green' : 'badge-red'}>
                  <span style={{ width:5, height:5, borderRadius:'50%', background: open() ? '#16a34a' : '#dc2626', display:'inline-block' }} />
                  {open() ? '☀️ Orders Open · 9AM–5PM' : 'Orders Closed · Opens 9AM'}
                </span>
                <span style={{ color:'#9ca3af', fontSize:12 }}>· Delivery 7–9PM</span>
              </div>
            </div>
            {totalQty > 0 && (
              <Link to="/cart" style={{ display:'flex', alignItems:'center', gap:12, background:'#fff7ed', border:'1.5px solid #fed7aa', borderRadius:14, padding:'10px 14px', textDecoration:'none', flexShrink:0 }}>
                <div style={{ width:38, height:38, background:'#f97316', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <ShoppingCart size={17} color="#fff" />
                </div>
                <div>
                  <p style={{ color:'#111827', fontWeight:600, fontSize:14 }}>{totalQty} items · ₹{total}</p>
                  <p style={{ color:'#f97316', fontSize:12 }}>View Cart →</p>
                </div>
              </Link>
            )}
          </div>
          <div style={{ position:'relative', maxWidth:460 }}>
            <Search size={15} color="#9ca3af" style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search stalls..." className="inp" style={{ paddingLeft:40 }} />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ background:'#fff', borderBottom:'1px solid #e5e7eb', padding:'12px 20px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', gap:8, overflowX:'auto', paddingBottom:2 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ flexShrink:0, padding:'6px 16px', borderRadius:8, fontSize:13, fontWeight:500, cursor:'pointer', border:'none', transition:'all 0.15s',
              background: cat === c ? '#f97316' : '#f3f4f6', color: cat === c ? '#fff' : '#6b7280',
              boxShadow: cat === c ? '0 2px 8px rgba(249,115,22,0.2)' : 'none' }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'22px 20px 80px' }}>
        <p style={{ color:'#9ca3af', fontSize:13, marginBottom:16 }}>{list.length} stalls</p>
        {loading ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:18 }}>
            {[...Array(6)].map((_,i) => (
              <div key={i} className="card" style={{ overflow:'hidden' }}>
                <div style={{ height:180, background:'#f3f4f6' }} />
                <div style={{ padding:18 }}>
                  <div style={{ height:16, background:'#f3f4f6', borderRadius:6, width:'60%', marginBottom:8 }} />
                  <div style={{ height:12, background:'#f3f4f6', borderRadius:6, width:'40%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : list.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px 20px', color:'#9ca3af' }}>
            <p style={{ fontSize:40, marginBottom:12 }}>🔍</p>
            <p style={{ fontSize:16, fontWeight:600, color:'#374151' }}>No stalls found</p>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:18 }}>
            {list.map(s => <StallCard key={s._id} stall={s} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function StallCard({ stall }) {
  return (
    <div className="card-hover" style={{ overflow:'hidden', opacity: stall.isOpen ? 1 : 0.6 }}>
      <div style={{ height:180, position:'relative', overflow:'hidden' }}>
        <img src={stall.image} alt={stall.name} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.4s' }}
          onMouseEnter={e => e.target.style.transform='scale(1.05)'} onMouseLeave={e => e.target.style.transform='scale(1)'} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 55%)' }} />
        {!stall.isOpen && (
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(220,38,38,0.85)', padding:'6px 14px', borderRadius:999 }}>
              <Lock size={12} color="#fff" />
              <span style={{ color:'#fff', fontSize:12, fontWeight:700 }}>CLOSED</span>
            </div>
          </div>
        )}
        <div style={{ position:'absolute', top:10, left:10 }}>
          <span className="badge-gray" style={{ background:'rgba(255,255,255,0.92)', backdropFilter:'blur(4px)' }}>{stall.category}</span>
        </div>
        <div style={{ position:'absolute', bottom:10, left:10, display:'flex', alignItems:'center', gap:3, background:'rgba(255,255,255,0.92)', backdropFilter:'blur(4px)', padding:'3px 8px', borderRadius:999 }}>
          <Star size={11} fill="#f59e0b" color="#f59e0b" />
          <span style={{ fontSize:12, fontWeight:600, color:'#1a1a1a' }}>{stall.rating}</span>
        </div>
      </div>
      <div style={{ padding:'16px 18px' }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:6 }}>
          <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:16, color:'#111827' }}>{stall.name}</h3>
          <span className={stall.isOpen ? 'badge-green' : 'badge-red'}>{stall.isOpen ? 'Open' : 'Closed'}</span>
        </div>
        <p style={{ color:'#6b7280', fontSize:13, marginBottom:12, lineHeight:1.5 }}>{stall.description}</p>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:14, fontSize:12, color:'#9ca3af' }}>
          <div style={{ display:'flex', alignItems:'center', gap:4 }}><Clock size={11} />{stall.deliveryTime}</div>
          <span>{stall.menu?.length || 0} items</span>
        </div>
        {stall.isOpen && (
          <Link to={`/stall/${stall._id}`} className="btn-orange" style={{ width:'100%', justifyContent:'center', padding:'9px' }}>
            View Menu <ChevronRight size={15} />
          </Link>
        )}
      </div>
    </div>
  );
}
