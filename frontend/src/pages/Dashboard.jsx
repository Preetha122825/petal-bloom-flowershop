import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { fetchMyOrders } from '../redux/orderSlice';

function Profile() {
  const { user } = useSelector(s => s.auth);
  const [form, setForm] = useState({ name: user?.name||'', phone: user?.phone||'' });
  const [saved, setSaved] = useState(false);
  return (
    <div className="card" style={{ padding:32 }}>
      <h2 style={{ fontFamily:'var(--ff-display)', fontSize:24, fontWeight:500, marginBottom:24 }}>My Profile</h2>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
        {[['Full Name', user?.name], ['Email', user?.email], ['Role', user?.role||'Customer'], ['Member Since', 'Jan 2025']].map(([l,v]) => (
          <div key={l} style={{ padding:14, background:'var(--blush)', borderRadius:12 }}>
            <div style={{ fontSize:10, fontWeight:600, letterSpacing:1, textTransform:'uppercase', color:'var(--warm-gray)', marginBottom:5 }}>{l}</div>
            <div style={{ fontSize:14, fontWeight:500 }}>{v}</div>
          </div>
        ))}
      </div>
      <h3 style={{ fontFamily:'var(--ff-display)', fontSize:20, fontWeight:500, marginBottom:16 }}>Edit Details</h3>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:16 }}>
        {[['name','Full Name'],['phone','Phone Number']].map(([k,l]) => (
          <div key={k} className="form-group">
            <label className="form-label">{l}</label>
            <input value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})} className="form-input" placeholder={l}/>
          </div>
        ))}
      </div>
      {saved && <div style={{ background:'var(--sage-light)', borderRadius:8, padding:'10px 14px', color:'#3A6B3E', fontSize:13, marginBottom:12 }}>✅ Profile updated!</div>}
      <button onClick={() => setSaved(true)} className="btn-primary">Save Changes</button>
    </div>
  );
}

function Orders() {
  const dispatch = useDispatch();
  const { myOrders } = useSelector(s => s.orders);
  const emojis = { Roses:'🌹', Lilies:'🌷', Tulips:'🌺', Bouquets:'💐', Wedding:'👰', 'Indoor Plants':'🌿' };

  useEffect(() => { dispatch(fetchMyOrders()); }, [dispatch]);

  if (!myOrders.length) return (
    <div className="card" style={{ padding:48, textAlign:'center' }}>
      <div style={{ fontSize:60, marginBottom:14 }}>📦</div>
      <h3 style={{ fontFamily:'var(--ff-display)', fontSize:22, marginBottom:8 }}>No orders yet</h3>
      <p style={{ color:'var(--warm-gray)', marginBottom:20, fontSize:13 }}>Your order history will appear here after your first purchase.</p>
      <Link to="/shop" className="btn-primary" style={{ textDecoration:'none' }}>Shop Now 🌸</Link>
    </div>
  );

  const statusColors = { Confirmed:'var(--sage)', Processing:'var(--gold)', Shipped:'#7C3AED', 'Out for Delivery':'var(--rose)', Delivered:'var(--sage)', Cancelled:'#e74c3c' };

  return (
    <div>
      <h2 style={{ fontFamily:'var(--ff-display)', fontSize:24, fontWeight:500, marginBottom:20 }}>Order History</h2>
      {myOrders.map(o => (
        <div key={o._id} className="card" style={{ padding:22, marginBottom:14 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <div>
              <div style={{ fontWeight:700, color:'var(--rose-dark)', fontSize:14 }}>#{o._id?.slice(-8).toUpperCase()}</div>
              <div style={{ fontSize:12, color:'var(--warm-gray)', marginTop:2 }}>{new Date(o.createdAt).toLocaleDateString('en-IN')}</div>
            </div>
            <span style={{ padding:'4px 12px', borderRadius:50, fontSize:11, fontWeight:600, background: statusColors[o.orderStatus]+'22', color: statusColors[o.orderStatus] }}>
              {o.orderStatus}
            </span>
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:12 }}>
            {o.items?.map(i => (
              <div key={i._id} style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, background:'var(--blush)', padding:'5px 10px', borderRadius:8 }}>
                <span>{emojis[i.category]||'🌸'}</span><span>{i.name} ×{i.quantity}</span>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ fontSize:13, color:'var(--warm-gray)' }}>
              {o.shippingAddress?.city} · {o.paymentMethod?.toUpperCase()}
            </div>
            <div style={{ fontFamily:'var(--ff-display)', fontSize:18, color:'var(--rose-dark)' }}>₹{o.totalPrice?.toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Wishlist() {
  return (
    <div className="card" style={{ padding:48, textAlign:'center' }}>
      <div style={{ fontSize:60, marginBottom:14 }}>💝</div>
      <h3 style={{ fontFamily:'var(--ff-display)', fontSize:22, marginBottom:8 }}>Your Wishlist</h3>
      <p style={{ color:'var(--warm-gray)', marginBottom:20, fontSize:13 }}>
        Save flowers you love by clicking the heart 🤍 on any product card. They'll appear here.
      </p>
      <Link to="/shop" className="btn-primary" style={{ textDecoration:'none' }}>Browse Flowers</Link>
    </div>
  );
}

function Settings() {
  const [settings, setSettings] = useState({ emailNotifs:true, offers:true, savedAddresses:true, twoFactor:false });
  return (
    <div className="card" style={{ padding:32 }}>
      <h2 style={{ fontFamily:'var(--ff-display)', fontSize:24, fontWeight:500, marginBottom:24 }}>Account Settings</h2>
      {[
        ['emailNotifs', '📧 Email Notifications', 'Get updates about your orders and deliveries'],
        ['offers',      '🌸 Seasonal Offers',      'Receive alerts for special promotions and discounts'],
        ['savedAddresses','📍 Save Addresses',     'Quickly checkout with saved delivery addresses'],
        ['twoFactor',   '🔐 Two-Factor Auth',      'Extra security for your account'],
      ].map(([key, title, desc]) => (
        <div key={key} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 0', borderBottom:'1px solid var(--border)' }}>
          <div>
            <div style={{ fontWeight:500, fontSize:14 }}>{title}</div>
            <div style={{ fontSize:12, color:'var(--warm-gray)', marginTop:2 }}>{desc}</div>
          </div>
          <div onClick={() => setSettings(s => ({...s,[key]:!s[key]}))}
            style={{ width:46, height:26, borderRadius:50, background: settings[key] ? 'var(--rose)' : 'var(--border)', cursor:'pointer', position:'relative', transition:'all .28s' }}>
            <div style={{ position:'absolute', top:3, left: settings[key] ? 23 : 3, width:20, height:20, borderRadius:'50%', background:'#fff', transition:'all .28s', boxShadow:'0 1px 4px rgba(0,0,0,.2)' }}/>
          </div>
        </div>
      ))}
      <div style={{ marginTop:24 }}>
        <h3 style={{ fontFamily:'var(--ff-display)', fontSize:20, fontWeight:500, marginBottom:14 }}>Change Password</h3>
        <div style={{ display:'grid', gap:12 }}>
          {['Current Password','New Password','Confirm New Password'].map(l => (
            <div key={l} className="form-group">
              <label className="form-label">{l}</label>
              <input type="password" className="form-input" placeholder="••••••••"/>
            </div>
          ))}
        </div>
        <button className="btn-primary" style={{ marginTop:14 }}>Update Password</button>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { pathname } = useLocation();
  const { user } = useSelector(s => s.auth);

  if (!user) { navigate('/login'); return null; }

  const tabs = [
    ['👤 Profile',   '/dashboard'],
    ['📦 Orders',    '/dashboard/orders'],
    ['❤️ Wishlist', '/dashboard/wishlist'],
    ['⚙️ Settings',  '/dashboard/settings'],
  ];

  return (
    <div style={{ paddingTop:'var(--nav-h)' }}>
      {/* Header */}
      <div style={{ background:'var(--blush)', padding:'28px 24px', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', display:'flex', alignItems:'center', gap:16 }}>
          <div style={{ width:56, height:56, borderRadius:'50%', background:'var(--rose)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, fontWeight:700 }}>
            {user.name?.[0]}
          </div>
          <div>
            <h1 style={{ fontFamily:'var(--ff-display)', fontSize:28, fontWeight:400 }}>Welcome, {user.name}</h1>
            <p style={{ color:'var(--warm-gray)', fontSize:13 }}>{user.email}</p>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', padding:'28px 24px', display:'grid', gridTemplateColumns:'200px 1fr', gap:28 }}>
        {/* Sidebar */}
        <aside>
          {tabs.map(([l, p]) => (
            <Link key={p} to={p} style={{ display:'block', padding:'11px 14px', borderRadius:9, textDecoration:'none', fontSize:13, fontWeight:500, marginBottom:3,
              background: pathname===p ? 'var(--rose-light)' : 'none',
              color:      pathname===p ? 'var(--rose)' : 'var(--charcoal)', transition:'all .18s' }}>{l}</Link>
          ))}
          <hr style={{ border:'none', borderTop:'1px solid var(--border)', margin:'10px 0' }}/>
          <button onClick={() => { dispatch(logout()); navigate('/'); }}
            style={{ display:'block', width:'100%', padding:'11px 14px', textAlign:'left', borderRadius:9, border:'none', cursor:'pointer', fontSize:13, fontWeight:500, color:'var(--rose)', background:'none' }}>
            🚪 Sign Out
          </button>
        </aside>

        {/* Content */}
        <div>
          <Routes>
            <Route index          element={<Profile/>} />
            <Route path="orders"  element={<Orders/>} />
            <Route path="wishlist"element={<Wishlist/>} />
            <Route path="settings"element={<Settings/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
