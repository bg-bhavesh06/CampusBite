import { Utensils, Target, Lightbulb, Users } from 'lucide-react';

const TEAM = [
  { name:"Yuvraj Gohil", role:"Full Stack Lead", dept:"IT", gender:"male", bio:"Leads overall architecture and development" },
  { name:"Foram Thakkar", role:"Frontend Developer", dept:"IT", gender:"female", bio:"Designs the beautiful user interface" },
  { name:"Dhruva Patel", role:"Admin & Database", dept:"IT", gender:"female", bio:"Manages admin panel and database" },
  { name:"Bhaves Ganvani", role:"Backend Developer", dept:"CSE", gender:"male", bio:"Builds server-side APIs and business logic" },
  { name:"Yagnik Gajera", role:"Admin & Database", dept:"CSE", gender:"male", bio:"Handles admin operations and DB management" },
];

export default function About() {
  return (
    <div className="page" style={{ paddingBottom:60 }}>
      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#fff7ed,#fff)', borderBottom:'1px solid #e5e7eb', padding:'48px 20px 36px', textAlign:'center' }}>
        <span className="badge-orange" style={{ marginBottom:14, display:'inline-flex' }}><Utensils size={11} /> Campus Food Delivery</span>
        <h1 style={{ fontFamily:'Syne', fontSize:'clamp(26px,5vw,44px)', fontWeight:800, color:'#111827', marginBottom:10 }}>
          About <span style={{ color:'#f97316' }}>CampusBite</span>
        </h1>
        <p style={{ color:'#6b7280', fontSize:16, maxWidth:460, margin:'0 auto' }}>Order during the day, get food delivered to your hostel every evening.</p>
      </div>

      <div style={{ maxWidth:880, margin:'0 auto', padding:'36px 20px' }}>
        {/* How it works */}
        <div className="card" style={{ padding:24, marginBottom:18 }}>
          <h2 style={{ fontFamily:'Syne', fontSize:18, fontWeight:700, color:'#111827', marginBottom:16 }}>How It Works</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:12 }}>
            {[
              { e:'☀️', t:'9AM–5PM', h:'Place Order', d:'Browse stalls & order during the day' },
              { e:'📋', t:'By 5PM', h:'Compiled', d:'Full list sent to delivery team' },
              { e:'🛵', t:'7PM–9PM', h:'Delivered', d:'Food at your hostel door' },
            ].map(s => (
              <div key={s.t} style={{ background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:12, padding:18, textAlign:'center' }}>
                <div style={{ fontSize:24, marginBottom:8 }}>{s.e}</div>
                <span className="badge-orange" style={{ marginBottom:8, display:'inline-flex' }}>{s.t}</span>
                <p style={{ fontFamily:'Syne', fontWeight:600, fontSize:14, color:'#111827', marginBottom:3 }}>{s.h}</p>
                <p style={{ color:'#9ca3af', fontSize:12 }}>{s.d}</p>
              </div>
            ))}
          </div>
          <p style={{ color:'#d1d5db', fontSize:12, textAlign:'center', marginTop:12 }}>⚠️ Orders after 5PM not accepted for same-day delivery</p>
        </div>

        {/* Problem/Solution */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:14, marginBottom:18 }}>
          <div className="card" style={{ padding:22 }}>
            <div style={{ width:40, height:40, background:'#fef2f2', borderRadius:11, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 }}><Target size={18} color="#ef4444" /></div>
            <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:16, color:'#111827', marginBottom:8 }}>The Problem</h3>
            <p style={{ color:'#6b7280', fontSize:14, lineHeight:1.7 }}>32+ hostels, some 1km from stalls. Students struggled to get evening food — skipping meals or long walks were the only options.</p>
          </div>
          <div className="card" style={{ padding:22 }}>
            <div style={{ width:40, height:40, background:'#f0fdf4', borderRadius:11, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 }}><Lightbulb size={18} color="#16a34a" /></div>
            <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:16, color:'#111827', marginBottom:8 }}>Our Solution</h3>
            <p style={{ color:'#6b7280', fontSize:14, lineHeight:1.7 }}>Order from 15 stalls during the day. At 5PM team picks up, sorts by hostel, delivers 7–9PM. Just ₹5 per item.</p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))', gap:12, marginBottom:18 }}>
          {[['15+','Food Stalls'],['32+','Hostels'],['₹5','Per Item'],['7–9PM','Delivery']].map(([v,l]) => (
            <div key={l} className="card" style={{ padding:'18px 14px', textAlign:'center' }}>
              <p style={{ fontFamily:'Syne', fontSize:28, fontWeight:800, color:'#f97316', lineHeight:1 }}>{v}</p>
              <p style={{ color:'#9ca3af', fontSize:12, marginTop:5 }}>{l}</p>
            </div>
          ))}
        </div>

        {/* Tech */}
        <div className="card" style={{ padding:22, marginBottom:24 }}>
          <h2 style={{ fontFamily:'Syne', fontWeight:700, fontSize:16, color:'#111827', marginBottom:14 }}>Built With</h2>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {['React.js','Node.js','Express.js','MongoDB Atlas','Tailwind CSS','Groq AI','JWT Auth','REST APIs'].map(t => (
              <span key={t} className="badge-orange">{t}</span>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ textAlign:'center', marginBottom:24 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, marginBottom:8 }}>
            <Users size={15} color="#f97316" /><span style={{ color:'#9ca3af', fontSize:13 }}>Meet the Team</span>
          </div>
          <h2 style={{ fontFamily:'Syne', fontSize:'clamp(20px,4vw,30px)', fontWeight:800, color:'#111827' }}>The CampusBite Team</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:14 }}>
          {TEAM.map(m => (
            <div key={m.name} className="card" style={{ padding:22, textAlign:'center' }}>
              <div style={{ width:64, height:64, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, fontWeight:700, color:'#fff', margin:'0 auto 12px',
                background: m.gender==='female' ? 'linear-gradient(135deg,#ec4899,#8b5cf6)' : 'linear-gradient(135deg,#f97316,#fbbf24)' }}>
                {m.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
              </div>
              <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:15, color:'#111827', marginBottom:5 }}>{m.name}</h3>
              <span className="badge-orange" style={{ marginBottom:5, display:'inline-flex' }}>{m.role}</span>
              <p style={{ color:'#9ca3af', fontSize:11, marginBottom:7 }}>{m.dept}</p>
              <p style={{ color:'#6b7280', fontSize:13, lineHeight:1.6 }}>{m.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
