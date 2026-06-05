import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { register } from '../../redux/authSlice';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'' });
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { toast.error("Passwords don't match"); return; }
    setLoading(true);
    const res = await dispatch(register({ name:form.name, email:form.email, password:form.password }));
    setLoading(false);
    if (res.meta.requestStatus === 'fulfilled') { toast.success('Welcome to Petal & Bloom! 🌸'); navigate('/'); }
    else toast.error(res.payload || 'Registration failed');
  };

  return (
    <div style={{ minHeight:'100vh',background:'linear-gradient(135deg,var(--cream),var(--blush))',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px' }}>
      <div style={{ width:'100%',maxWidth:440 }}>
        <div style={{ textAlign:'center',marginBottom:28 }}>
          <div style={{ fontSize:48,marginBottom:8 }}>🌻</div>
          <h1 style={{ fontFamily:'var(--ff-display)',fontSize:32,fontWeight:400 }}>Join Us</h1>
          <p style={{ color:'var(--warm-gray)',fontSize:13 }}>Create your account to start blooming</p>
        </div>
        <div className="card" style={{ padding:32 }}>
          <form onSubmit={handle} style={{ display:'grid',gap:14 }}>
            {[['text','name','Full Name','Priya Sharma'],['email','email','Email Address','you@example.com'],['password','password','Password','••••••••'],['password','confirm','Confirm Password','••••••••']].map(([t,k,l,p]) => (
              <div key={k} className="form-group">
                <label className="form-label">{l}</label>
                <input type={t} value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} className="form-input" placeholder={p} required/>
              </div>
            ))}
            <button type="submit" className="btn-primary" style={{ width:'100%',justifyContent:'center',padding:'13px',marginTop:6,fontSize:15 }} disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account 🌸'}
            </button>
          </form>
          <p style={{ textAlign:'center',marginTop:16,fontSize:13,color:'var(--warm-gray)' }}>
            Already have an account? <Link to="/login" style={{ color:'var(--rose)',fontWeight:600,textDecoration:'none' }}>Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
