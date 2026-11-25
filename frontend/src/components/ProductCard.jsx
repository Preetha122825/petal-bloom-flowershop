import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addLocal } from '../redux/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [hov, setHov] = useState(false);
  const emojis = { Roses:'🌹', Lilies:'🌷', Tulips:'🌺', Bouquets:'💐', Wedding:'👰', 'Indoor Plants':'🌿' };
  const emoji = emojis[product.category] || '🌸';
  const badgeColors = { Sale:'var(--rose)', New:'var(--sage)', Premium:'var(--gold)', Bestseller:'#2C2C2C', Popular:'#7C3AED' };

  return (
    <div className="card">
      {product.badge && (
        <div style={{ position:'absolute',top:10,left:10,zIndex:2,padding:'3px 9px',borderRadius:50,fontSize:10,fontWeight:700,background:badgeColors[product.badge]||'var(--charcoal)',color:'#fff' }}>
          {product.badge}
        </div>
      )}
      <Link to={`/shop/${product._id}`} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ display:'block',height:180,background:'linear-gradient(135deg,var(--blush),var(--rose-light))',textDecoration:'none',
          display:'flex',alignItems:'center',justifyContent:'center',fontSize:72,transition:'all .28s',
          transform: hov ? 'scale(1.02)' : 'scale(1)' }}>
        <span style={{ transition:'transform .35s', transform: hov ? 'rotate(8deg) scale(1.12)' : 'none', display:'block' }}>{emoji}</span>
      </Link>

      <div style={{ padding:'14px' }}>
        <div style={{ fontSize:10,color:'var(--warm-gray)',marginBottom:3,letterSpacing:.8,textTransform:'uppercase',fontWeight:500 }}>{product.category}</div>
        <Link to={`/shop/${product._id}`} style={{ textDecoration:'none' }}>
          <h3 style={{ fontFamily:'var(--ff-display)',fontSize:17,fontWeight:500,marginBottom:6,cursor:'pointer',lineHeight:1.25,color:'var(--charcoal)' }}>{product.name}</h3>
        </Link>
        <div style={{ display:'flex',alignItems:'center',gap:5,marginBottom:10 }}>
          <span className="stars" style={{ fontSize:12 }}>{'★'.repeat(Math.floor(product.rating || 0))}</span>
          <span style={{ fontSize:11,color:'var(--warm-gray)' }}>({product.numReviews})</span>
        </div>
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
          <div>
            <span style={{ fontSize:17,fontWeight:700,color:'var(--rose-dark)' }}>₹{product.price?.toLocaleString()}</span>
            {product.originalPrice && <span style={{ fontSize:11,color:'#bbb',textDecoration:'line-through',marginLeft:5 }}>₹{product.originalPrice.toLocaleString()}</span>}
          </div>
          <button onClick={() => { dispatch(addLocal(product)); toast.success(`${product.name} added! 🌸`); }}
            className="btn-primary" style={{ padding:'7px 14px',fontSize:12 }}>Add</button>
        </div>
      </div>
    </div>
  );
}
