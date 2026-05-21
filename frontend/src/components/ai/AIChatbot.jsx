import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import axios from 'axios';

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { role:'assistant', content:"Hey! 👋 I'm FoodieAI! Ask me what to eat, food jokes, or stall recommendations! 🍕" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const msg = input.trim(); setInput('');
    setMsgs(p => [...p, { role:'user', content:msg }]);
    setLoading(true);
    try {
      const history = msgs.slice(-6).map(m => ({ role:m.role, content:m.content }));
      const r = await axios.post('/api/ai/chat', { message:msg, history });
      setMsgs(p => [...p, { role:'assistant', content:r.data.reply }]);
    } catch {
      setMsgs(p => [...p, { role:'assistant', content:"Oops! Try again! 😅" }]);
    } finally { setLoading(false); }
  };

  const qs = ["What to eat? 🤔","Spicy food 🌶️","Something sweet 🍫","Healthy options 🥗"];

  return (
    <>
      <button onClick={() => setOpen(!open)} style={{ position:'fixed', bottom:22, right:22, zIndex:50, width:50, height:50, borderRadius:14, background: open?'#fff':'#f97316', border: open?'1.5px solid #e5e7eb':'none', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow: open?'0 2px 8px rgba(0,0,0,0.1)':'0 6px 20px rgba(249,115,22,0.35)', transition:'all 0.2s' }}>
        {open ? <X size={19} color="#6b7280" /> : <MessageCircle size={19} color="#fff" />}
        {!open && <span style={{ position:'absolute', top:-2, right:-2, width:10, height:10, background:'#22c55e', borderRadius:'50%', border:'2px solid #f5f5f5' }} />}
      </button>

      {open && (
        <div style={{ position:'fixed', bottom:84, right:22, zIndex:50, width:330, height:460, background:'#fff', border:'1.5px solid #e5e7eb', borderRadius:18, display:'flex', flexDirection:'column', boxShadow:'0 16px 48px rgba(0,0,0,0.1)', animation:'fadeUp 0.25s ease', fontFamily:'Inter', overflow:'hidden' }}>
          {/* Header */}
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', borderBottom:'1px solid #f3f4f6', background:'#fff' }}>
            <div style={{ width:32, height:32, background:'#f97316', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Bot size={15} color="#fff" />
            </div>
            <div>
              <p style={{ fontWeight:600, fontSize:14, color:'#111827' }}>FoodieAI</p>
              <p style={{ fontSize:11, color:'#22c55e', display:'flex', alignItems:'center', gap:4 }}>
                <span style={{ width:5, height:5, background:'#22c55e', borderRadius:'50%', display:'inline-block' }} /> Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:'auto', padding:'10px 12px', display:'flex', flexDirection:'column', gap:10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display:'flex', justifyContent: m.role==='user'?'flex-end':'flex-start', gap:6, alignItems:'flex-end' }}>
                {m.role==='assistant' && (
                  <div style={{ width:22, height:22, background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Bot size={10} color="#f97316" />
                  </div>
                )}
                <div style={{ maxWidth:'78%', padding:'8px 12px', borderRadius:13, fontSize:13, lineHeight:1.5,
                  background: m.role==='user'?'#f97316':'#f9fafb',
                  color: m.role==='user'?'#fff':'#374151',
                  border: m.role==='assistant'?'1px solid #f3f4f6':'none',
                  borderBottomRightRadius: m.role==='user'?3:13,
                  borderBottomLeftRadius: m.role==='assistant'?3:13 }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display:'flex', gap:6, alignItems:'flex-end' }}>
                <div style={{ width:22, height:22, background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:7, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Bot size={10} color="#f97316" />
                </div>
                <div style={{ background:'#f9fafb', border:'1px solid #f3f4f6', padding:'8px 14px', borderRadius:13, borderBottomLeftRadius:3 }}>
                  <div style={{ display:'flex', gap:3 }}>
                    {[0,1,2].map(i => <span key={i} style={{ width:5, height:5, background:'#d1d5db', borderRadius:'50%', display:'inline-block', animation:`bounce 0.9s ${i*0.15}s infinite` }} />)}
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Quick prompts */}
          {msgs.length <= 2 && (
            <div style={{ padding:'0 10px 8px', display:'flex', flexWrap:'wrap', gap:6 }}>
              {qs.map((q,i) => (
                <button key={i} onClick={() => setInput(q)} style={{ background:'#f9fafb', border:'1px solid #e5e7eb', borderRadius:999, padding:'3px 10px', fontSize:11, color:'#6b7280', cursor:'pointer', fontFamily:'Inter' }}>{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding:'10px', borderTop:'1px solid #f3f4f6', display:'flex', gap:8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && send()}
              placeholder="Ask about food..." className="inp" style={{ flex:1, padding:'8px 12px', fontSize:13 }} />
            <button onClick={send} disabled={!input.trim()||loading}
              style={{ width:36, height:36, background: input.trim()?'#f97316':'#f3f4f6', border:'none', borderRadius:9, display:'flex', alignItems:'center', justifyContent:'center', cursor: input.trim()?'pointer':'default', transition:'background 0.15s' }}>
              <Send size={13} color={input.trim()?'#fff':'#9ca3af'} />
            </button>
          </div>
          <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}`}</style>
        </div>
      )}
    </>
  );
}
