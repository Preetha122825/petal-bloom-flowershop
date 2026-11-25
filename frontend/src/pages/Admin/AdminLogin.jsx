import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminLogin } from '../../redux/authSlice';

export default function AdminLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(s => s.auth);
  const [form, setForm] = useState({ email:'admin@petalandbloom.in', password:'' });
  const [showPw, setShowPw] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please enter email and password'); return; }
    const res = await dispatch(adminLogin(form));
    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Welcome, Admin! 🌸');
      navigate('/admin');
    } else {
      toast.error(res.payload || 'Invalid admin credentials');
    }
  };

  return (
    <div style={{ minHeight:'100vh', background:'var(--charcoal)', display:'flex', alignItems:'center', justifyContent:'center', padding:'24px', fontFamily:'var(--ff-body)' }}>
      <div style={{ width:'100%', maxWidth:420 }}>

        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ fontSize:52, marginBottom:12 }}>🔐</div>
          <h1 style={{ fontFamily:'var(--ff-display)', fontSize:34, fontWeight:400, color:'#fff' }}>Admin Portal</h1>
          <p style={{ color:'rgba(255,255,255,.45)', fontSize:13, marginTop:6 }}>Petal & Bloom Management System</p>
        </div>

        {/* Card */}
        <div style={{ background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.12)', borderRadius:20, padding:36 }}>
          <form onSubmit={handle} style={{ display:'grid', gap:16 }}>

            <div className="form-group">
              <label style={{ fontSize:12, fontWeight:500, color:'rgba(255,255,255,.7)', marginBottom:6, display:'block' }}>Admin Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({...form, email:e.target.value})}
                required
                placeholder="admin@petalandbloom.in"
                style={{ width:'100%', padding:'12px 14px', border:'1px solid rgba(255,255,255,.15)', borderRadius:10, fontSize:14, color:'#fff', background:'rgba(255,255,255,.08)', outline:'none', transition:'border-color .18s' }}
                onFocus={e  => e.target.style.borderColor='var(--rose)'}
                onBlur={e   => e.target.style.borderColor='rgba(255,255,255,.15)'}
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize:12, fontWeight:500, color:'rgba(255,255,255,.7)', marginBottom:6, display:'block' }}>Password</label>
              <div style={{ position:'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({...form, password:e.target.value})}
                  required
                  placeholder="••••••••"
                  style={{ width:'100%', padding:'12px 44px 12px 14px', border:'1px solid rgba(255,255,255,.15)', borderRadius:10, fontSize:14, color:'#fff', background:'rgba(255,255,255,.08)', outline:'none', transition:'border-color .18s' }}
                  onFocus={e => e.target.style.borderColor='var(--rose)'}
                  onBlur={e  => e.target.style.borderColor='rgba(255,255,255,.15)'}
                />
                <button type="button" onClick={() => setShowPw(s => !s)}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', fontSize:16, color:'rgba(255,255,255,.4)' }}>
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              style={{ width:'100%', padding:'13px', borderRadius:50, background:'var(--rose)', color:'#fff', border:'none', cursor:loading?'not-allowed':'pointer', fontWeight:600, fontSize:15, marginTop:6, opacity:loading?.7:1, transition:'all .22s' }}
              onMouseEnter={e => { if(!loading) e.currentTarget.style.background='var(--rose-dark)'; }}
              onMouseLeave={e => e.currentTarget.style.background='var(--rose)'}>
              {loading ? 'Signing in...' : 'Login to Dashboard'}
            </button>
          </form>

          <div style={{ marginTop:20, padding:'12px 14px', background:'rgba(255,255,255,.04)', borderRadius:8, fontSize:12, color:'rgba(255,255,255,.4)', textAlign:'center', lineHeight:1.6 }}>
            Default credentials after <code style={{ color:'var(--rose)' }}>npm run seed</code>:<br/>
            <strong style={{ color:'rgba(255,255,255,.6)' }}>admin@petalandbloom.in</strong> / <strong style={{ color:'rgba(255,255,255,.6)' }}>admin123</strong>
          </div>
        </div>

        <div style={{ textAlign:'center', marginTop:20 }}>
          <Link to="/" style={{ color:'rgba(255,255,255,.35)', fontSize:12, textDecoration:'none' }}>← Back to Store</Link>
        </div>
      </div>
    </div>
  );
}
