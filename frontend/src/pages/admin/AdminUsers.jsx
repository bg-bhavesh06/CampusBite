import { useState, useEffect } from 'react';
import { Trash2, Search, Users } from 'lucide-react';
import axios from 'axios';
import AdminLayout from '../../components/admin/AdminLayout';
import toast from 'react-hot-toast';

export default function AdminUsers() {
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(true);
  const [search,setSearch] = useState('');

  useEffect(()=>{ axios.get('/api/admin/users').then(r=>{setUsers(r.data);setLoading(false);}).catch(()=>setLoading(false)); },[]);

  const del = async (id,name) => { if(!confirm(`Delete "${name}"?`))return; await axios.delete(`/api/admin/users/${id}`); setUsers(p=>p.filter(u=>u._id!==id)); toast.success('Deleted!'); };

  const list = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.mobile.includes(search) || u.hostel?.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout title="Users">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:10 }}>
        <p style={{ color:'#9ca3af', fontSize:14 }}>{users.length} students</p>
        <div style={{ position:'relative' }}>
          <Search size={13} color="#9ca3af" style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)' }}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{ background:'#fff', border:'1.5px solid #e5e7eb', borderRadius:9, padding:'8px 12px 8px 34px', fontSize:13, color:'#1a1a1a', outline:'none', width:260 }}/>
        </div>
      </div>

      {loading ? <div style={{ display:'flex',justifyContent:'center',padding:60 }}><div className="spin"/></div> : (
        <div className="card" style={{ overflow:'hidden' }}>
          {list.length===0 ? <div style={{ textAlign:'center', padding:'40px 20px', color:'#9ca3af' }}><Users size={32} style={{ margin:'0 auto 10px', opacity:0.3 }}/><p>No users</p></div> : (
            <div style={{ overflowX:'auto' }}>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead><tr style={{ borderBottom:'1px solid #f3f4f6' }}>
                  {['Student','Mobile','Hostel','Room','Joined',''].map(h=>(
                    <th key={h} style={{ textAlign:'left', padding:'11px 16px', color:'#9ca3af', fontSize:11, fontWeight:600, textTransform:'uppercase', letterSpacing:'0.05em', whiteSpace:'nowrap' }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {list.map(u=>(
                    <tr key={u._id} style={{ borderBottom:'1px solid #f9fafb' }}
                      onMouseEnter={e=>e.currentTarget.style.background='#fafafa'} onMouseLeave={e=>e.currentTarget.style.background=''}>
                      <td style={{ padding:'12px 16px' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:30, height:30, borderRadius:'50%', background:'#fff7ed', border:'1.5px solid #fed7aa', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                            <span style={{ color:'#f97316', fontSize:12, fontWeight:700 }}>{u.name[0]}</span>
                          </div>
                          <span style={{ color:'#111827', fontSize:14 }}>{u.name}</span>
                        </div>
                      </td>
                      <td style={{ padding:'12px 16px', color:'#6b7280', fontSize:13, fontFamily:'monospace' }}>{u.mobile}</td>
                      <td style={{ padding:'12px 16px', color:'#6b7280', fontSize:13 }}>{u.hostel}</td>
                      <td style={{ padding:'12px 16px', color:'#6b7280', fontSize:13 }}>{u.roomNumber}</td>
                      <td style={{ padding:'12px 16px', color:'#9ca3af', fontSize:12 }}>{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                      <td style={{ padding:'12px 16px' }}>
                        <button onClick={()=>del(u._id,u.name)} style={{ width:28,height:28,display:'flex',alignItems:'center',justifyContent:'center',background:'#fef2f2',border:'1px solid #fecaca',borderRadius:7,cursor:'pointer',color:'#ef4444' }}><Trash2 size={12}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
