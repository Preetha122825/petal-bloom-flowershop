import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../../redux/authSlice';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(s => s.auth);
  const [form, setForm] = useState({ email:'', password:'' });

  const handle = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(form));
    if (res.meta.requestStatus === 'fulfilled') { toast.success('Welcome back! 🌸'); navigate('/'); }
    else toast.error(res.payload || 'Login failed');
  };

  return (
    <div style={{ minHeight:'100vh',background:'linear-gradient(135deg,var(--cream),var(--blush))',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px' }}>
      <div style={{ width:'100%',maxWidth:420 }}>
        <div style={{ textAlign:'center',marginBottom:28 }}>
          <div style={{ fontSize:48,marginBottom:8 }}>🌸</div>
          <h1 style={{ fontFamily:'var(--ff-display)',fontSize:32,fontWeight:400 }}>Welcome Back</h1>
          <p style={{ color:'var(--warm-gray)',marginTop:6,fontSize:13 }}>Sign in to your bloom garden</p>
        </div>
        <div className="card" style={{ padding:32 }}>
          <form onSubmit={handle} style={{ display:'grid',gap:14 }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} className="form-input" placeholder="you@example.com" required/>
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" value={form.password} onChange={e => setForm({...form,password:e.target.value})} className="form-input" placeholder="••••••••" required/>
            </div>
            <button type="submit" className="btn-primary" style={{ width:'100%',justifyContent:'center',padding:'13px',marginTop:6,fontSize:15 }} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In 🌸'}
            </button>
          </form>
          <p style={{ textAlign:'center',marginTop:16,fontSize:13,color:'var(--warm-gray)' }}>
            New here? <Link to="/register" style={{ color:'var(--rose)',fontWeight:600,textDecoration:'none' }}>Register</Link>
          </p>
          <Link to="/admin/login" style={{ display:'block',textAlign:'center',marginTop:8,fontSize:12,color:'var(--warm-gray)',textDecoration:'none' }}>Admin Login →</Link>
        </div>
      </div>
    </div>
  );
}
