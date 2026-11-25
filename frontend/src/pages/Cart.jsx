import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeLocal, updateLocal } from '../redux/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(s => s.cart);

  if (!items.length) return (
    <div style={{ paddingTop:'var(--nav-h)',minHeight:'80vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14 }}>
      <div style={{ fontSize:72 }}>🛒</div>
      <h2 style={{ fontFamily:'var(--ff-display)',fontSize:28,fontWeight:400 }}>Your cart is empty</h2>
      <Link to="/shop" className="btn-primary" style={{ textDecoration:'none' }}>Browse Flowers</Link>
    </div>
  );

  const emojis = { Roses:'🌹', Lilies:'🌷', Tulips:'🌺', Bouquets:'💐', Wedding:'👰', 'Indoor Plants':'🌿' };
  const subtotal  = items.reduce((s, i) => s + i.price * (i.quantity||1), 0);
  const shipping  = subtotal > 4250 ? 0 : 510;
  const total     = subtotal + shipping;

  return (
    <div style={{ paddingTop:'var(--nav-h)' }}>
      <div style={{ background:'var(--blush)',padding:'28px 24px',borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'var(--max-w)',margin:'0 auto' }}>
          <h1 style={{ fontFamily:'var(--ff-display)',fontSize:36,fontWeight:400 }}>🛒 Shopping Cart</h1>
          <p style={{ color:'var(--warm-gray)',fontSize:13 }}>{items.reduce((s,i) => s+(i.quantity||1), 0)} items</p>
        </div>
      </div>
      <div style={{ maxWidth:'var(--max-w)',margin:'0 auto',padding:'32px 24px',display:'grid',gridTemplateColumns:'1fr 300px',gap:28,alignItems:'start' }}>
        <div>
          {items.map(item => (
            <div key={item._id} className="card" style={{ padding:16,marginBottom:12,display:'flex',gap:14,alignItems:'center' }}>
              <div style={{ width:68,height:68,background:'var(--blush)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:34,flexShrink:0 }}>
                {emojis[item.category]||'🌸'}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:10,color:'var(--warm-gray)',marginBottom:2 }}>{item.category}</div>
                <h3 style={{ fontFamily:'var(--ff-display)',fontSize:16,fontWeight:500,marginBottom:2 }}>{item.name}</h3>
                <div style={{ color:'var(--rose-dark)',fontWeight:600,fontSize:13 }}>₹{item.price?.toLocaleString()} each</div>
              </div>
              <div style={{ display:'flex',alignItems:'center',gap:6 }}>
                <button onClick={() => dispatch(updateLocal({ id:item._id, quantity:Math.max(1,(item.quantity||1)-1) }))} style={{ width:28,height:28,borderRadius:'50%',border:'1.5px solid var(--border)',background:'#fff',cursor:'pointer',fontSize:14 }}>−</button>
                <span style={{ minWidth:24,textAlign:'center',fontWeight:600,fontSize:14 }}>{item.quantity||1}</span>
                <button onClick={() => dispatch(updateLocal({ id:item._id, quantity:(item.quantity||1)+1 }))} style={{ width:28,height:28,borderRadius:'50%',border:'1.5px solid var(--border)',background:'#fff',cursor:'pointer',fontSize:14 }}>+</button>
              </div>
              <div style={{ minWidth:70,textAlign:'right' }}>
                <div style={{ fontWeight:700,fontSize:14 }}>₹{(item.price*(item.quantity||1)).toLocaleString()}</div>
                <button onClick={() => dispatch(removeLocal(item._id))} style={{ fontSize:11,color:'var(--rose)',background:'none',border:'none',cursor:'pointer',marginTop:3 }}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding:22,position:'sticky',top:'calc(var(--nav-h) + 16px)' }}>
          <h3 style={{ fontFamily:'var(--ff-display)',fontSize:20,fontWeight:500,marginBottom:18 }}>Summary</h3>
          {[['Subtotal',`₹${subtotal.toLocaleString()}`],['Shipping',shipping===0?'Free 🎉':`₹${shipping}`],['Giftwrap','Free 🎀']].map(([l,v]) => (
            <div key={l} style={{ display:'flex',justifyContent:'space-between',marginBottom:10,fontSize:13 }}>
              <span style={{ color:'var(--warm-gray)' }}>{l}</span>
              <span style={{ fontWeight:500,color:v.includes('Free')?'var(--sage)':'var(--charcoal)' }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop:'1.5px solid var(--border)',paddingTop:14,marginBottom:16 }}>
            <div style={{ display:'flex',justifyContent:'space-between',fontFamily:'var(--ff-display)',fontSize:20 }}>
              <span>Total</span><span style={{ color:'var(--rose-dark)' }}>₹{total.toLocaleString()}</span>
            </div>
          </div>
          <button onClick={() => navigate('/checkout')} className="btn-primary" style={{ width:'100%',justifyContent:'center',padding:'12px',fontSize:15 }}>Checkout →</button>
          <Link to="/shop" className="btn-ghost" style={{ width:'100%',justifyContent:'center',marginTop:8,textDecoration:'none' }}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
