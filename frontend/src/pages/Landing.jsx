import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Clock, MapPin, Zap, Shield, Utensils } from 'lucide-react';

export default function Landing() {
  const { user } = useAuth();
  if (user) return <Navigate to="/home" />;

  const S = { textDecoration:'none' };

  return (
    <div style={{ background:'#fff', fontFamily:'Inter, sans-serif' }}>
      {/* Nav */}
      <nav style={{ position:'sticky', top:0, zIndex:50, background:'#fff', borderBottom:'1px solid #e5e7eb', height:64, display:'flex', alignItems:'center' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 20px', width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:32, height:32, background:'#f97316', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Utensils size={15} color="#fff" />
            </div>
            <span style={{ fontFamily:'Syne', fontWeight:800, fontSize:18, color:'#1a1a1a' }}>campus<span style={{ color:'#f97316' }}>bite</span></span>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <Link to="/about" style={{ ...S, padding:'6px 14px', color:'#6b7280', fontSize:14 }}>About</Link>
            <Link to="/home" style={{ ...S, padding:'6px 14px', color:'#6b7280', fontSize:14 }}>Browse Stalls</Link>
            <Link to="/login" style={{ ...S, padding:'6px 14px', color:'#6b7280', fontSize:14 }}>Login</Link>
            <Link to="/register" className="btn-orange" style={{ padding:'8px 18px' }}>Sign Up Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ background:'linear-gradient(135deg, #fff7ed 0%, #fff 60%)', padding:'80px 20px 60px', textAlign:'center' }}>
        <div style={{ maxWidth:680, margin:'0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:999, padding:'5px 14px', marginBottom:24 }}>
            <span style={{ width:7, height:7, background:'#f97316', borderRadius:'50%', display:'inline-block' }} />
            <span style={{ color:'#ea580c', fontSize:13, fontWeight:500 }}>Campus Food Delivery · Now Live</span>
          </div>
          <h1 style={{ fontFamily:'Syne', fontSize:'clamp(36px,7vw,68px)', fontWeight:800, color:'#111827', lineHeight:1.1, letterSpacing:'-0.03em', marginBottom:20 }}>
            Hungry at Hostel?<br />
            <span style={{ color:'#f97316' }}>We Deliver.</span>
          </h1>
          <p style={{ color:'#6b7280', fontSize:18, lineHeight:1.7, maxWidth:460, margin:'0 auto 36px' }}>
            Order from 15+ campus stalls before 5PM. Get food delivered to your hostel between 7–9PM.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap', marginBottom:48 }}>
            <Link to="/home" className="btn-orange" style={{ fontSize:16, padding:'13px 32px', boxShadow:'0 6px 20px rgba(249,115,22,0.3)' }}>
              Browse Stalls <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-white" style={{ fontSize:16, padding:'13px 32px' }}>Sign In</Link>
          </div>
          <div style={{ display:'inline-flex', flexWrap:'wrap', justifyContent:'center', gap:'8px 32px', background:'#fff', border:'1px solid #e5e7eb', borderRadius:16, padding:'18px 32px', boxShadow:'0 2px 12px rgba(0,0,0,0.06)' }}>
            {[['15+','Stalls'],['32+','Hostels'],['₹5','Per Item'],['7–9PM','Delivery']].map(([v,l]) => (
              <div key={l} style={{ textAlign:'center' }}>
                <p style={{ fontFamily:'Syne', fontSize:24, fontWeight:800, color:'#f97316', lineHeight:1 }}>{v}</p>
                <p style={{ color:'#9ca3af', fontSize:12, marginTop:3 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding:'72px 20px', background:'#f9fafb' }}>
        <div style={{ maxWidth:960, margin:'0 auto' }}>
          <p style={{ color:'#f97316', fontSize:12, fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', textAlign:'center', marginBottom:8 }}>Simple Process</p>
          <h2 style={{ fontFamily:'Syne', fontSize:'clamp(24px,4vw,38px)', fontWeight:800, color:'#111827', textAlign:'center', marginBottom:40 }}>How it works</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:16 }}>
            {[
              { n:'01', emoji:'☀️', time:'9AM – 5PM', title:'Place Order', desc:'Browse 15+ stalls, add items to cart, pay online.' },
              { n:'02', emoji:'📋', time:'By 5PM', title:'We Compile', desc:'Our team picks up from each stall, sorts by hostel.' },
              { n:'03', emoji:'🛵', time:'7PM – 9PM', title:'Delivered', desc:'Food arrives at your hostel door. No walking!' },
            ].map(s => (
              <div key={s.n} className="card" style={{ padding:24, position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:16, right:16, fontFamily:'Syne', fontSize:40, fontWeight:800, color:'#f3f4f6', lineHeight:1 }}>{s.n}</div>
                <div style={{ fontSize:26, marginBottom:10 }}>{s.emoji}</div>
                <span className="badge-orange" style={{ marginBottom:10, display:'inline-flex' }}>{s.time}</span>
                <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:16, color:'#111827', marginBottom:6 }}>{s.title}</h3>
                <p style={{ color:'#6b7280', fontSize:14, lineHeight:1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding:'72px 20px', background:'#fff' }}>
        <div style={{ maxWidth:960, margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Syne', fontSize:'clamp(24px,4vw,38px)', fontWeight:800, color:'#111827', textAlign:'center', marginBottom:40 }}>Why CampusBite?</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:16 }}>
            {[
              { icon:Clock, t:'Order 9AM–5PM', d:'All day ordering window' },
              { icon:MapPin, t:'32+ Hostels', d:'Every hostel on campus' },
              { icon:Zap, t:'₹5 Per Item', d:'Flat honest delivery charge' },
              { icon:Shield, t:'Secure Pay', d:'Online payment, no cash' },
            ].map(({ icon:I, t, d }) => (
              <div key={t} className="card" style={{ padding:24 }}>
                <div style={{ width:42, height:42, background:'#fff7ed', borderRadius:11, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 }}>
                  <I size={19} color="#f97316" />
                </div>
                <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:15, color:'#111827', marginBottom:4 }}>{t}</h3>
                <p style={{ color:'#9ca3af', fontSize:13 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stalls */}
      <section style={{ padding:'60px 20px', background:'#f9fafb', textAlign:'center' }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <h2 style={{ fontFamily:'Syne', fontSize:'clamp(22px,4vw,36px)', fontWeight:800, color:'#111827', marginBottom:28 }}>15 Stalls, One Platform</h2>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, justifyContent:'center' }}>
            {["Domino's","Lapinoz","Ajay's","Brownico","Jagdish","Indian Salt","Size-Zero","Day Night Vada Pav","Mr. Puff","Marco's Pizza","Kudrati Kahumbo","Santushti","Boba 91","Belgium Waffle","Zorko"].map(s => (
              <span key={s} className="badge-gray" style={{ padding:'6px 14px', fontSize:13 }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'72px 20px', background:'#fff', textAlign:'center' }}>
        <div style={{ maxWidth:500, margin:'0 auto', background:'linear-gradient(135deg,#fff7ed,#fff)', border:'1.5px solid #fed7aa', borderRadius:20, padding:'44px 28px' }}>
          <h2 style={{ fontFamily:'Syne', fontSize:32, fontWeight:800, color:'#111827', marginBottom:8 }}>Ready to Order?</h2>
          <p style={{ color:'#9ca3af', fontSize:15, marginBottom:24 }}>Create your account in 30 seconds</p>
          <Link to="/register" className="btn-orange" style={{ fontSize:16, padding:'13px 36px', boxShadow:'0 6px 20px rgba(249,115,22,0.3)' }}>
            Get Started Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <div style={{ background:'#f9fafb', borderTop:'1px solid #e5e7eb', textAlign:'center', padding:'18px', color:'#9ca3af', fontSize:13 }}>
        © 2024 CampusBite · Made with ❤️ by Team CampusBite
      </div>
    </div>
  );
}
