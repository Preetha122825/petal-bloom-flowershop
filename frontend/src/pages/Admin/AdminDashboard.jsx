import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../../redux/authSlice';
import { fetchProducts, deleteProduct, createProduct, updateProduct } from '../../redux/productSlice';
import { fetchAllOrders, updateStatus } from '../../redux/orderSlice';
import api from '../../utils/api';

/* ── Overview ──────────────────────────────────────────────────── */
function Overview() {
  const [stats, setStats] = useState(null);
  const { myOrders: orders } = useSelector(s => s.orders);
  useEffect(() => {
    api.get('/admin/stats').then(r => setStats(r.data.stats)).catch(() => {});
  }, []);

  const cards = [
    { icon:'💰', label:'Total Revenue',   val: stats ? `₹${stats.revenue?.toLocaleString()}` : '—', color:'var(--rose)' },
    { icon:'📦', label:'Total Orders',    val: stats?.totalOrders ?? '—',    color:'var(--sage)' },
    { icon:'🌸', label:'Products',        val: stats?.totalProducts ?? '—',  color:'var(--gold)' },
    { icon:'👥', label:'Customers',       val: stats?.totalUsers ?? '—',     color:'#7C3AED' },
  ];

  return (
    <div>
      <h1 style={{ fontFamily:'var(--ff-display)', fontSize:30, fontWeight:400, marginBottom:24 }}>Dashboard Overview</h1>

      {/* Stat Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18, marginBottom:28 }}>
        {cards.map(({ icon, label, val, color }) => (
          <div key={label} style={{ background:'#fff', borderRadius:16, padding:22, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
            <div style={{ fontSize:28, marginBottom:8 }}>{icon}</div>
            <div style={{ fontSize:10, fontWeight:600, letterSpacing:1, textTransform:'uppercase', color:'var(--warm-gray)', marginBottom:4 }}>{label}</div>
            <div style={{ fontFamily:'var(--ff-display)', fontSize:30, color }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Revenue Bar Chart */}
      <div style={{ background:'#fff', borderRadius:16, padding:26, boxShadow:'0 2px 12px rgba(0,0,0,.06)', marginBottom:20 }}>
        <h3 style={{ fontFamily:'var(--ff-display)', fontSize:20, fontWeight:500, marginBottom:20 }}>Monthly Revenue (2025)</h3>
        <div style={{ display:'flex', alignItems:'flex-end', gap:10, height:140 }}>
          {[60,78,52,88,74,96,68,83,100,87,91,75].map((h,i) => (
            <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}>
              <div style={{ width:'100%', background: i===10 ? 'var(--rose)' : 'var(--rose-light)', borderRadius:'5px 5px 0 0', height:`${h}%`, transition:'height .4s ease' }}/>
              <div style={{ fontSize:9, color:'var(--warm-gray)' }}>{'JFMAMJJASOND'[i]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent orders preview */}
      <div style={{ background:'#fff', borderRadius:16, padding:26, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <h3 style={{ fontFamily:'var(--ff-display)', fontSize:20, fontWeight:500 }}>Recent Orders</h3>
          <Link to="/admin/orders" style={{ color:'var(--rose)', fontSize:13, textDecoration:'none', fontWeight:600 }}>View All →</Link>
        </div>
        {orders.length === 0 ? (
          <p style={{ color:'var(--warm-gray)', fontSize:13, textAlign:'center', padding:'20px 0' }}>No orders yet. Place a test order from the shop!</p>
        ) : orders.slice(0,5).map(o => (
          <div key={o._id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'1px solid var(--border)' }}>
            <div>
              <div style={{ fontWeight:600, fontSize:13 }}>#{o._id?.slice(-8).toUpperCase()}</div>
              <div style={{ fontSize:11, color:'var(--warm-gray)' }}>{new Date(o.createdAt).toLocaleDateString('en-IN')}</div>
            </div>
            <span style={{ fontSize:11, padding:'3px 10px', borderRadius:50, background:'var(--sage-light)', color:'#3A6B3E', fontWeight:600 }}>{o.orderStatus}</span>
            <div style={{ fontFamily:'var(--ff-display)', fontSize:16, color:'var(--rose-dark)' }}>₹{o.totalPrice?.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Products ──────────────────────────────────────────────────── */
function Products() {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector(s => s.products);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const CATS = ['Roses','Lilies','Tulips','Bouquets','Wedding','Indoor Plants'];
  const blank = { name:'', category:'Roses', price:'', originalPrice:'', stock:'', badge:'', description:'', care:'' };
  const [form, setForm] = useState(blank);

  useEffect(() => { dispatch(fetchProducts({ limit:50 })); }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, price:+form.price, stock:+form.stock, originalPrice: form.originalPrice ? +form.originalPrice : null };
    if (editId) {
      await dispatch(updateProduct({ id:editId, data }));
      toast.success('Product updated!');
    } else {
      await dispatch(createProduct(data));
      toast.success('Product added! 🌸');
    }
    setShowForm(false); setEditId(null); setForm(blank);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    await dispatch(deleteProduct(id));
    toast.error('Product deleted');
  };

  const handleEdit = (p) => {
    setForm({ name:p.name, category:p.category, price:p.price, originalPrice:p.originalPrice||'', stock:p.stock, badge:p.badge||'', description:p.description, care:p.care||'' });
    setEditId(p._id); setShowForm(true);
  };

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:22 }}>
        <h1 style={{ fontFamily:'var(--ff-display)', fontSize:30, fontWeight:400 }}>Manage Products</h1>
        <button onClick={() => { setShowForm(s => !s); setEditId(null); setForm(blank); }} className="btn-primary">
          {showForm ? '✕ Cancel' : '+ Add Product'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background:'#fff', borderRadius:16, padding:28, marginBottom:22, boxShadow:'0 2px 12px rgba(0,0,0,.08)' }}>
          <h3 style={{ fontFamily:'var(--ff-display)', fontSize:20, fontWeight:500, marginBottom:18 }}>{editId ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:14 }}>
              <div className="form-group" style={{ gridColumn:'1/-1' }}>
                <label className="form-label">Product Name *</label>
                <input value={form.name} onChange={e => setForm({...form,name:e.target.value})} className="form-input" required placeholder="e.g. Crimson Rose Bouquet"/>
              </div>
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select value={form.category} onChange={e => setForm({...form,category:e.target.value})} className="form-input">
                  {CATS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Price (₹) *</label>
                <input type="number" value={form.price} onChange={e => setForm({...form,price:e.target.value})} className="form-input" required placeholder="4249"/>
              </div>
              <div className="form-group">
                <label className="form-label">Original Price (₹)</label>
                <input type="number" value={form.originalPrice} onChange={e => setForm({...form,originalPrice:e.target.value})} className="form-input" placeholder="5250 (for sale badge)"/>
              </div>
              <div className="form-group">
                <label className="form-label">Stock *</label>
                <input type="number" value={form.stock} onChange={e => setForm({...form,stock:e.target.value})} className="form-input" required placeholder="25"/>
              </div>
              <div className="form-group">
                <label className="form-label">Badge</label>
                <select value={form.badge} onChange={e => setForm({...form,badge:e.target.value})} className="form-input">
                  {['','Bestseller','New','Sale','Premium','Popular','Seasonal','Exotic','Wedding'].map(b => <option key={b} value={b}>{b||'None'}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ gridColumn:'1/-1' }}>
                <label className="form-label">Description *</label>
                <textarea value={form.description} onChange={e => setForm({...form,description:e.target.value})} className="form-input" rows={3} required placeholder="Describe the flower arrangement..."/>
              </div>
              <div className="form-group" style={{ gridColumn:'1/-1' }}>
                <label className="form-label">Care Instructions</label>
                <input value={form.care} onChange={e => setForm({...form,care:e.target.value})} className="form-input" placeholder="e.g. Trim stems daily, keep in cool water"/>
              </div>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button type="submit" className="btn-primary">{editId ? 'Update Product' : 'Save Product'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="btn-outline">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div style={{ background:'#fff', borderRadius:16, overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 80px 70px 90px', padding:'12px 20px', background:'var(--blush)', fontSize:10, fontWeight:600, letterSpacing:1, textTransform:'uppercase', color:'var(--warm-gray)' }}>
          <span>Product</span><span>Category</span><span>Price</span><span>Stock</span><span>Actions</span>
        </div>
        {loading ? <div className="spinner" style={{ margin:'30px auto' }}/> : products.map(p => (
          <div key={p._id} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 80px 70px 90px', padding:'13px 20px', alignItems:'center', borderBottom:'1px solid var(--border)', fontSize:13 }}>
            <span style={{ fontWeight:500 }}>{p.name}</span>
            <span style={{ color:'var(--warm-gray)' }}>{p.category}</span>
            <span style={{ fontWeight:700, color:'var(--rose-dark)' }}>₹{p.price?.toLocaleString()}</span>
            <span>
              <span style={{ padding:'2px 8px', borderRadius:4, fontSize:11, background: p.stock<10?'#FEE':'var(--sage-light)', color: p.stock<10?'#c0392b':'#3A6B3E', fontWeight:600 }}>{p.stock}</span>
            </span>
            <span style={{ display:'flex', gap:5 }}>
              <button onClick={() => handleEdit(p)} style={{ padding:'4px 10px', borderRadius:6, border:'1px solid var(--border)', background:'#fff', cursor:'pointer', fontSize:11 }}>Edit</button>
              <button onClick={() => handleDelete(p._id, p.name)} style={{ padding:'4px 10px', borderRadius:6, border:'1px solid #fcc', background:'#FEF2F2', cursor:'pointer', fontSize:11, color:'#c0392b' }}>Del</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Orders ────────────────────────────────────────────────────── */
function Orders() {
  const dispatch = useDispatch();
  const { allOrders } = useSelector(s => s.orders);
  const STATUSES = ['Confirmed','Processing','Shipped','Out for Delivery','Delivered','Cancelled'];

  useEffect(() => { dispatch(fetchAllOrders()); }, [dispatch]);

  return (
    <div>
      <h1 style={{ fontFamily:'var(--ff-display)', fontSize:30, fontWeight:400, marginBottom:22 }}>Order Management</h1>
      {allOrders.length === 0 ? (
        <div style={{ background:'#fff', borderRadius:16, padding:52, textAlign:'center', boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
          <div style={{ fontSize:52, marginBottom:14 }}>📦</div>
          <p style={{ color:'var(--warm-gray)', fontSize:13 }}>No orders yet. Customer orders will appear here.</p>
        </div>
      ) : allOrders.map(o => (
        <div key={o._id} style={{ background:'#fff', borderRadius:16, padding:22, marginBottom:14, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
            <div>
              <div style={{ fontWeight:700, fontSize:14, color:'var(--rose-dark)' }}>#{o._id?.slice(-8).toUpperCase()}</div>
              <div style={{ fontSize:12, color:'var(--warm-gray)', marginTop:2 }}>
                {new Date(o.createdAt).toLocaleDateString('en-IN')} · {o.user?.name} · {o.shippingAddress?.city}
              </div>
            </div>
            <select defaultValue={o.orderStatus}
              onChange={e => { dispatch(updateStatus({ id:o._id, status:e.target.value })); toast.success('Status updated!'); }}
              style={{ padding:'6px 12px', borderRadius:8, border:'1.5px solid var(--border)', fontSize:12, cursor:'pointer', background:'#fff' }}>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
            {o.items?.map(i => (
              <div key={i._id} style={{ background:'var(--blush)', padding:'5px 10px', borderRadius:7, fontSize:12 }}>
                🌸 {i.name} ×{i.quantity}
              </div>
            ))}
          </div>
          <div style={{ fontFamily:'var(--ff-display)', fontSize:18, color:'var(--rose-dark)', textAlign:'right' }}>
            ₹{o.totalPrice?.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Users ─────────────────────────────────────────────────────── */
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/users').then(r => { setUsers(r.data.users); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 style={{ fontFamily:'var(--ff-display)', fontSize:30, fontWeight:400, marginBottom:22 }}>User Management</h1>
      <div style={{ background:'#fff', borderRadius:16, overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 2fr 1fr 80px', padding:'12px 20px', background:'var(--blush)', fontSize:10, fontWeight:600, letterSpacing:1, textTransform:'uppercase', color:'var(--warm-gray)' }}>
          <span>Name</span><span>Email</span><span>Role</span><span>Joined</span>
        </div>
        {loading ? <div className="spinner" style={{ margin:'30px auto' }}/> : users.map(u => (
          <div key={u._id} style={{ display:'grid', gridTemplateColumns:'2fr 2fr 1fr 80px', padding:'13px 20px', alignItems:'center', borderBottom:'1px solid var(--border)', fontSize:13 }}>
            <span style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:30, height:30, borderRadius:'50%', background:'var(--rose)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, flexShrink:0 }}>{u.name?.[0]}</div>
              <span style={{ fontWeight:500 }}>{u.name}</span>
            </span>
            <span style={{ color:'var(--warm-gray)' }}>{u.email}</span>
            <span style={{ padding:'2px 8px', borderRadius:50, fontSize:11, fontWeight:600, background: u.role==='admin'?'var(--rose-light)':'var(--sage-light)', color: u.role==='admin'?'var(--rose)':'#3A6B3E', display:'inline-block' }}>{u.role}</span>
            <span style={{ fontSize:12, color:'var(--warm-gray)' }}>{new Date(u.createdAt).toLocaleDateString('en-IN',{month:'short',year:'numeric'})}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Analytics ─────────────────────────────────────────────────── */
function Analytics() {
  const { items: products } = useSelector(s => s.products);
  const catCounts = ['Roses','Lilies','Tulips','Bouquets','Wedding','Indoor Plants'].map(c => ({
    name:c, count: products.filter(p=>p.category===c).length,
    pct: products.length ? Math.round(products.filter(p=>p.category===c).length/products.length*100) : 0,
  }));
  const colors = ['var(--rose)','var(--sage)','var(--gold)','#7C3AED','#E67E22','#1ABC9C'];

  return (
    <div>
      <h1 style={{ fontFamily:'var(--ff-display)', fontSize:30, fontWeight:400, marginBottom:22 }}>Analytics</h1>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        <div style={{ background:'#fff', borderRadius:16, padding:26, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
          <h3 style={{ fontFamily:'var(--ff-display)', fontSize:20, fontWeight:500, marginBottom:18 }}>Products by Category</h3>
          {catCounts.map(({ name, pct, count }, i) => (
            <div key={name} style={{ marginBottom:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:5 }}>
                <span style={{ fontWeight:500 }}>{name}</span>
                <span style={{ color:'var(--warm-gray)' }}>{count} items · {pct}%</span>
              </div>
              <div style={{ height:8, background:'var(--blush)', borderRadius:4, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${pct||0}%`, background:colors[i], borderRadius:4, transition:'width .6s ease' }}/>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background:'#fff', borderRadius:16, padding:26, boxShadow:'0 2px 12px rgba(0,0,0,.06)' }}>
          <h3 style={{ fontFamily:'var(--ff-display)', fontSize:20, fontWeight:500, marginBottom:18 }}>Top Rated Products</h3>
          {products.sort((a,b) => b.rating-a.rating).slice(0,6).map((p,i) => (
            <div key={p._id} style={{ display:'flex', gap:10, alignItems:'center', padding:'9px 0', borderBottom:'1px solid var(--border)' }}>
              <span style={{ fontFamily:'var(--ff-display)', fontSize:18, color:'var(--rose-light)', minWidth:24 }}>#{i+1}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:500, fontSize:13 }}>{p.name}</div>
                <div style={{ fontSize:11, color:'var(--warm-gray)' }}>{'★'.repeat(Math.floor(p.rating||0))} {p.rating}</div>
              </div>
              <div style={{ fontWeight:700, color:'var(--rose-dark)', fontSize:13 }}>₹{p.price?.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Shell ─────────────────────────────────────────────────────── */
export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useSelector(s => s.auth);

  useEffect(() => { dispatch(fetchAllOrders()); dispatch(fetchProducts({ limit:50 })); }, [dispatch]);

  if (!user || user.role !== 'admin') { navigate('/admin/login'); return null; }

  const nav = [
    ['📊 Overview',   '/admin'],
    ['🌸 Products',   '/admin/products'],
    ['📦 Orders',     '/admin/orders'],
    ['👥 Users',      '/admin/users'],
    ['📈 Analytics',  '/admin/analytics'],
  ];

  return (
    <div style={{ display:'flex', minHeight:'100vh' }}>
      {/* Sidebar */}
      <aside style={{ width:220, background:'var(--charcoal)', position:'fixed', top:0, bottom:0, left:0, overflowY:'auto', padding:'24px 0', zIndex:100 }}>
        <div style={{ padding:'0 20px 18px', borderBottom:'1px solid rgba(255,255,255,.1)', marginBottom:10 }}>
          <div style={{ fontFamily:'var(--ff-display)', fontSize:18, color:'#fff' }}>🌸 Admin Panel</div>
          <div style={{ fontSize:11, color:'rgba(255,255,255,.4)', marginTop:2 }}>{user.email}</div>
        </div>
        {nav.map(([l, p]) => (
          <Link key={p} to={p} style={{ display:'block', padding:'11px 20px', textDecoration:'none', fontSize:13, fontWeight:500, transition:'all .18s',
            background: pathname===p ? 'rgba(200,85,106,.2)' : 'none',
            color:      pathname===p ? 'var(--rose)' : 'rgba(255,255,255,.65)' }}>
            {l}
          </Link>
        ))}
        <div style={{ borderTop:'1px solid rgba(255,255,255,.1)', margin:'12px 0' }}/>
        <Link to="/" style={{ display:'block', padding:'10px 20px', textDecoration:'none', fontSize:13, color:'rgba(255,255,255,.4)' }}>← Back to Store</Link>
        <button onClick={() => { dispatch(logout()); navigate('/'); }}
          style={{ display:'block', width:'100%', padding:'10px 20px', textAlign:'left', color:'var(--rose)', background:'none', border:'none', cursor:'pointer', fontSize:13, fontWeight:500 }}>
          🚪 Logout
        </button>
      </aside>

      {/* Main */}
      <main style={{ flex:1, marginLeft:220, padding:'32px', background:'#F5F5F5', minHeight:'100vh' }}>
        <Routes>
          <Route index            element={<Overview/>} />
          <Route path="products"  element={<Products/>} />
          <Route path="orders"    element={<Orders/>} />
          <Route path="users"     element={<Users/>} />
          <Route path="analytics" element={<Analytics/>} />
        </Routes>
      </main>
    </div>
  );
}
