import { useState, useEffect } from 'react';
import { Plus, Trash2, ToggleLeft, ToggleRight, ChevronDown, ChevronUp, Edit3, X, Check } from 'lucide-react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import toast from 'react-hot-toast';

const ES = { name:'',description:'',category:'General',image:'',deliveryTime:'30-40 min' };
const EI = { name:'',price:'',description:'',category:'Main' };

export default function Stalls() {
  const [stalls,setStalls] = useState([]);
  const [loading,setLoading] = useState(true);
  const [exp,setExp] = useState(null);
  const [addStall,setAddStall] = useState(false);
  const [ns,setNs] = useState(ES);
  const [editS,setEditS] = useState(null);
  const [editSD,setEditSD] = useState(ES);
  const [addItem,setAddItem] = useState(null);
  const [ni,setNi] = useState(EI);
  const [editI,setEditI] = useState(null);
  const [editID,setEditID] = useState(EI);

  useEffect(() => { loadStalls(); }, []);
  const loadStalls = () => axios.get('/api/stalls').then(r=>{setStalls(r.data);setLoading(false);}).catch(()=>setLoading(false));

  const toggle = async id => { await axios.patch(`/api/stalls/${id}/toggle`); setStalls(p=>p.map(s=>s._id===id?{...s,isOpen:!s.isOpen}:s)); toast.success('Updated!'); };
  const delStall = async (id,name) => { if(!confirm(`Delete "${name}"?`))return; await axios.delete(`/api/stalls/${id}`); setStalls(p=>p.filter(s=>s._id!==id)); toast.success('Deleted!'); };
  const saveStall = async id => { const r=await axios.put(`/api/stalls/${id}`,editSD); setStalls(p=>p.map(s=>s._id===id?r.data:s)); setEditS(null); toast.success('Updated!'); };
  const createStall = async () => { if(!ns.name){toast.error('Enter name');return;} const r=await axios.post('/api/stalls',ns); setStalls(p=>[...p,r.data]); setNs(ES); setAddStall(false); toast.success('Added!'); };
  const addMenuItem = async sid => { if(!ni.name||!ni.price){toast.error('Fill name & price');return;} const r=await axios.post(`/api/stalls/${sid}/menu`,{...ni,price:Number(ni.price)}); setStalls(p=>p.map(s=>s._id===sid?r.data:s)); setNi(EI); setAddItem(null); toast.success('Item added!'); };
  const saveItem = async (sid,iid) => { const r=await axios.put(`/api/stalls/${sid}/menu/${iid}`,{...editID,price:Number(editID.price)}); setStalls(p=>p.map(x=>x._id===sid?r.data:x)); setEditI(null); toast.success('Updated!'); };
  const delItem = async (sid,iid) => { const r=await axios.delete(`/api/stalls/${sid}/menu/${iid}`); setStalls(p=>p.map(s=>s._id===sid?r.data:s)); toast.success('Removed!'); };

  const inp = { width:'100%', background:'#fff', border:'1.5px solid #e5e7eb', borderRadius:8, padding:'8px 12px', fontSize:13, color:'#1a1a1a', outline:'none', fontFamily:'Inter' };
  const lbl = { fontSize:11, fontWeight:600, color:'#6b7280', display:'block', marginBottom:4 };

  return (
    <AdminLayout title="Food Stalls">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <p style={{ color:'#9ca3af', fontSize:14 }}>{stalls.length} stalls</p>
        <button onClick={()=>setAddStall(!addStall)} className="btn-orange" style={{ padding:'8px 16px', fontSize:13 }}><Plus size={13}/> Add Stall</button>
      </div>

      {addStall && (
        <div className="card" style={{ padding:20, marginBottom:16, border:'1.5px solid #fed7aa' }}>
          <h3 style={{ fontFamily:'Syne', fontWeight:700, color:'#111827', marginBottom:14 }}>New Stall</h3>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
            {[['Name *','name','Pizza Hub'],['Category','category','Pizza'],['Delivery','deliveryTime','30-40 min'],['Image URL','image','https://...']].map(([l,k,p])=>(
              <div key={k}><label style={lbl}>{l}</label><input value={ns[k]} onChange={e=>setNs({...ns,[k]:e.target.value})} placeholder={p} style={inp}/></div>
            ))}
            <div style={{ gridColumn:'1/-1' }}><label style={lbl}>Description</label><input value={ns.description} onChange={e=>setNs({...ns,description:e.target.value})} placeholder="Short description" style={inp}/></div>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={createStall} className="btn-orange" style={{ padding:'7px 14px', fontSize:13 }}><Check size={12}/> Add</button>
            <button onClick={()=>setAddStall(false)} className="btn-white" style={{ padding:'7px 14px', fontSize:13 }}>Cancel</button>
          </div>
        </div>
      )}

      {loading ? <div style={{ display:'flex', justifyContent:'center', padding:60 }}><div className="spin"/></div> : (
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {stalls.map(stall => (
            <div key={stall._id} className="card" style={{ overflow:'hidden' }}>
              {editS===stall._id ? (
                <div style={{ padding:20 }}>
                  <p style={{ color:'#f97316', fontWeight:600, fontSize:13, marginBottom:12 }}>Editing: {stall.name}</p>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
                    {[['Name','name'],['Category','category'],['Delivery','deliveryTime'],['Image URL','image']].map(([l,k])=>(
                      <div key={k}><label style={lbl}>{l}</label><input value={editSD[k]} onChange={e=>setEditSD({...editSD,[k]:e.target.value})} style={inp}/></div>
                    ))}
                    <div style={{ gridColumn:'1/-1' }}><label style={lbl}>Description</label><input value={editSD.description} onChange={e=>setEditSD({...editSD,description:e.target.value})} style={inp}/></div>
                  </div>
                  <div style={{ display:'flex', gap:10 }}>
                    <button onClick={()=>saveStall(stall._id)} className="btn-orange" style={{ padding:'7px 14px', fontSize:13 }}><Check size={12}/> Save</button>
                    <button onClick={()=>setEditS(null)} className="btn-white" style={{ padding:'7px 14px', fontSize:13 }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 16px', gap:12 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12, flex:1, minWidth:0 }}>
                    <img src={stall.image||'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=60&h=60&fit=crop'} alt={stall.name} style={{ width:44,height:44,borderRadius:9,objectFit:'cover',flexShrink:0 }}/>
                    <div style={{ minWidth:0 }}>
                      <p style={{ fontFamily:'Syne', fontWeight:700, fontSize:14, color:'#111827', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{stall.name}</p>
                      <p style={{ color:'#9ca3af', fontSize:12, marginTop:1 }}>{stall.category} · {stall.menu?.length||0} items</p>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:7, flexShrink:0 }}>
                    <button onClick={()=>toggle(stall._id)} style={{ display:'flex', alignItems:'center', gap:5, padding:'5px 10px', borderRadius:7, border:'none', fontSize:12, fontWeight:600, cursor:'pointer', background:stall.isOpen?'#f0fdf4':'#fef2f2', color:stall.isOpen?'#16a34a':'#dc2626' }}>
                      {stall.isOpen?<ToggleRight size={13}/>:<ToggleLeft size={13}/>}{stall.isOpen?'Open':'Closed'}
                    </button>
                    <button onClick={()=>{setEditS(stall._id);setEditSD({name:stall.name,description:stall.description||'',category:stall.category||'',image:stall.image||'',deliveryTime:stall.deliveryTime||''});setExp(stall._id)}} style={{ width:30,height:30,display:'flex',alignItems:'center',justifyContent:'center',background:'#fff7ed',border:'1px solid #fed7aa',borderRadius:7,cursor:'pointer',color:'#f97316' }}><Edit3 size={12}/></button>
                    <button onClick={()=>setExp(exp===stall._id?null:stall._id)} style={{ width:30,height:30,display:'flex',alignItems:'center',justifyContent:'center',background:'#f9fafb',border:'1px solid #e5e7eb',borderRadius:7,cursor:'pointer',color:'#6b7280' }}>
                      {exp===stall._id?<ChevronUp size={12}/>:<ChevronDown size={12}/>}
                    </button>
                    <button onClick={()=>delStall(stall._id,stall.name)} style={{ width:30,height:30,display:'flex',alignItems:'center',justifyContent:'center',background:'#fef2f2',border:'1px solid #fecaca',borderRadius:7,cursor:'pointer',color:'#ef4444' }}><Trash2 size={12}/></button>
                  </div>
                </div>
              )}

              {exp===stall._id && editS!==stall._id && (
                <div style={{ borderTop:'1px solid #f3f4f6', padding:'14px 16px' }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                    <p style={{ color:'#6b7280', fontSize:13, fontWeight:600 }}>Menu ({stall.menu?.length||0})</p>
                    <button onClick={()=>setAddItem(addItem===stall._id?null:stall._id)} style={{ display:'flex', alignItems:'center', gap:4, color:'#f97316', background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:7, padding:'5px 10px', fontSize:12, fontWeight:600, cursor:'pointer' }}><Plus size={11}/> Add</button>
                  </div>

                  {addItem===stall._id && (
                    <div style={{ background:'#fff7ed', border:'1px solid #fed7aa', borderRadius:11, padding:14, marginBottom:12 }}>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
                        <div><label style={lbl}>Name *</label><input value={ni.name} onChange={e=>setNi({...ni,name:e.target.value})} placeholder="Pizza Margherita" style={inp}/></div>
                        <div><label style={lbl}>Price ₹*</label><input type="number" value={ni.price} onChange={e=>setNi({...ni,price:e.target.value})} placeholder="149" style={inp}/></div>
                        <div><label style={lbl}>Category</label><input value={ni.category} onChange={e=>setNi({...ni,category:e.target.value})} placeholder="Pizza" style={inp}/></div>
                        <div><label style={lbl}>Description</label><input value={ni.description} onChange={e=>setNi({...ni,description:e.target.value})} placeholder="Short desc" style={inp}/></div>
                      </div>
                      <div style={{ display:'flex', gap:8 }}>
                        <button onClick={()=>addMenuItem(stall._id)} className="btn-orange" style={{ padding:'6px 12px', fontSize:12 }}><Check size={11}/> Add</button>
                        <button onClick={()=>setAddItem(null)} className="btn-white" style={{ padding:'6px 10px', fontSize:12 }}>Cancel</button>
                      </div>
                    </div>
                  )}

                  <div style={{ display:'flex', flexDirection:'column' }}>
                    {stall.menu?.map(item => (
                      <div key={item._id}>
                        {editI===item._id ? (
                          <div style={{ background:'#f9fafb', borderRadius:9, padding:12, marginBottom:4 }}>
                            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:10 }}>
                              <div><label style={lbl}>Name</label><input value={editID.name} onChange={e=>setEditID({...editID,name:e.target.value})} style={inp}/></div>
                              <div><label style={lbl}>Price ₹</label><input type="number" value={editID.price} onChange={e=>setEditID({...editID,price:e.target.value})} style={inp}/></div>
                              <div><label style={lbl}>Category</label><input value={editID.category} onChange={e=>setEditID({...editID,category:e.target.value})} style={inp}/></div>
                              <div><label style={lbl}>Description</label><input value={editID.description} onChange={e=>setEditID({...editID,description:e.target.value})} style={inp}/></div>
                            </div>
                            <div style={{ display:'flex', gap:8 }}>
                              <button onClick={()=>saveItem(stall._id,item._id)} className="btn-orange" style={{ padding:'6px 12px', fontSize:12 }}><Check size={11}/> Save</button>
                              <button onClick={()=>setEditI(null)} className="btn-white" style={{ padding:'6px 10px', fontSize:12 }}>Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'9px 8px', borderRadius:8, transition:'background 0.1s' }}
                            onMouseEnter={e=>e.currentTarget.style.background='#f9fafb'} onMouseLeave={e=>e.currentTarget.style.background=''}>
                            <div style={{ flex:1, minWidth:0 }}>
                              <span style={{ color:'#374151', fontSize:13 }}>{item.name}</span>
                              <span style={{ color:'#9ca3af', fontSize:11, marginLeft:6 }}>· {item.category}</span>
                            </div>
                            <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
                              <span style={{ color:'#f97316', fontWeight:700, fontSize:14 }}>₹{item.price}</span>
                              <button onClick={()=>{setEditI(item._id);setEditID({name:item.name,price:item.price,category:item.category||'',description:item.description||''})}} style={{ width:26,height:26,display:'flex',alignItems:'center',justifyContent:'center',background:'#fff7ed',border:'1px solid #fed7aa',borderRadius:6,cursor:'pointer',color:'#f97316' }}><Edit3 size={10}/></button>
                              <button onClick={()=>delItem(stall._id,item._id)} style={{ width:26,height:26,display:'flex',alignItems:'center',justifyContent:'center',background:'#fef2f2',border:'1px solid #fecaca',borderRadius:6,cursor:'pointer',color:'#ef4444' }}><X size={10}/></button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
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
