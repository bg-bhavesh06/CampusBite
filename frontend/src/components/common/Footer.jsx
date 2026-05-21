import { Link } from 'react-router-dom';
import { Utensils, Clock, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background:'#1f2937', marginTop:80 }}>
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'48px 20px 28px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:32, marginBottom:40 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
              <div style={{ width:32, height:32, background:'#f97316', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Utensils size={15} color="#fff" />
              </div>
              <span style={{ fontFamily:'Syne', fontWeight:800, fontSize:17, color:'#fff' }}>campus<span style={{ color:'#f97316' }}>bite</span></span>
            </div>
            <p style={{ color:'#9ca3af', fontSize:13, lineHeight:1.7 }}>Order from 15+ campus stalls. Delivered to your hostel every evening.</p>
          </div>
          <div>
            <p style={{ color:'#fff', fontWeight:700, fontSize:12, marginBottom:14, textTransform:'uppercase', letterSpacing:'0.06em' }}>Links</p>
            {[['Food Stalls','/home'],['My Cart','/cart'],['My Orders','/my-orders'],['About Us','/about']].map(([l,p]) => (
              <Link key={p} to={p} style={{ display:'block', color:'#9ca3af', fontSize:14, marginBottom:8, textDecoration:'none' }}
                onMouseEnter={e => e.target.style.color='#f97316'} onMouseLeave={e => e.target.style.color='#9ca3af'}>{l}</Link>
            ))}
          </div>
          <div>
            <p style={{ color:'#fff', fontWeight:700, fontSize:12, marginBottom:14, textTransform:'uppercase', letterSpacing:'0.06em' }}>Hours</p>
            <div style={{ color:'#9ca3af', fontSize:13, lineHeight:2 }}>
              <p>☀️ Orders: 9AM – 5PM</p>
              <p>🛵 Delivery: 7PM – 9PM</p>
              <p>📦 32+ Hostels covered</p>
              <p>💰 ₹5 per item delivery</p>
            </div>
          </div>
          <div>
            <p style={{ color:'#fff', fontWeight:700, fontSize:12, marginBottom:14, textTransform:'uppercase', letterSpacing:'0.06em' }}>Contact</p>
            <p style={{ color:'#9ca3af', fontSize:13, marginBottom:8 }}>📧 campusbite@campus.edu</p>
            <p style={{ color:'#9ca3af', fontSize:13 }}>📍 Campus, Gujarat</p>
          </div>
        </div>
        

        <div style={{ borderTop:'1px solid #374151', paddingTop:20, textAlign:'center' }}>
  <p style={{ color:'#6b7280', fontSize:13 }}>© 2024 CampusBite · Made with ❤️ by Team CampusBite</p>
</div>
      </div>
    </footer>
  );
}






/* <div style={{ borderTop:'1px solid #374151', paddingTop:20, display:'flex', flexWrap:'wrap', justifyContent:'space-between', gap:8 }}>
          <p style={{ color:'#6b7280', fontSize:13 }}>© 2024 CampusBite</p>
          <p style={{ color:'#6b7280', fontSize:13 }}>Made with ❤️ by Team CampusBite</p>
        </div> */