import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchProduct } from '../redux/productSlice';
import { addLocal } from '../redux/cartSlice';
import { fetchProducts } from '../redux/productSlice';

const EMOJIS = { Roses:'🌹', Lilies:'🌷', Tulips:'🌺', Bouquets:'💐', Wedding:'👰', 'Indoor Plants':'🌿' };

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, items: allProducts } = useSelector(s => s.products);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');

  useEffect(() => { dispatch(fetchProduct(id)); dispatch(fetchProducts({ limit:12 })); }, [dispatch, id]);

  if (!product) return <div style={{ paddingTop:'var(--nav-h)', display:'flex', alignItems:'center', justifyContent:'center', minHeight:'60vh' }}><div className="spinner"/></div>;

  const emoji   = EMOJIS[product.category] || '🌸';
  const related = allProducts.filter(p => p.category === product.category && p._id !== product._id).slice(0,4);

  return (
    <div style={{ paddingTop:'var(--nav-h)' }}>
      {/* Breadcrumb */}
      <div style={{ background:'var(--blush)', padding:'10px 24px', borderBottom:'1px solid var(--border)' }}>
        <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', display:'flex', gap:6, fontSize:12, color:'var(--warm-gray)' }}>
          <Link to="/" style={{ color:'var(--rose)', textDecoration:'none' }}>Home</Link> ›
          <Link to="/shop" style={{ color:'var(--rose)', textDecoration:'none' }}>Shop</Link> ›
          <span>{product.name}</span>
        </div>
      </div>

      <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', padding:'44px 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:52, alignItems:'start', marginBottom:52 }}>
          {/* Image */}
          <div>
            <div style={{ background:'linear-gradient(135deg,var(--blush),var(--rose-light))', borderRadius:22, padding:52, textAlign:'center', fontSize:130, lineHeight:1, marginBottom:12 }}>
              {emoji}
            </div>
            <div style={{ display:'flex', gap:8 }}>
              {[emoji,'🌿','🎀'].map((e,i) => (
                <div key={i} style={{ flex:1, background:'var(--blush)', borderRadius:10, padding:10, textAlign:'center', fontSize:22, cursor:'pointer', border:`2px solid ${i===0?'var(--rose)':'var(--border)'}` }}>{e}</div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div style={{ marginBottom:10 }}>
              <span style={{ padding:'3px 10px', borderRadius:50, fontSize:11, fontWeight:600, background:'var(--rose-light)', color:'var(--rose-dark)' }}>{product.category}</span>
              {product.badge && <span style={{ marginLeft:6, padding:'3px 10px', borderRadius:50, fontSize:11, fontWeight:700, background:'var(--rose)', color:'#fff' }}>{product.badge}</span>}
            </div>

            <h1 style={{ fontFamily:'var(--ff-display)', fontSize:38, fontWeight:400, lineHeight:1.2, marginBottom:12 }}>{product.name}</h1>

            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
              <span style={{ color:'var(--gold)', fontSize:16 }}>{'★'.repeat(Math.floor(product.rating||0))}</span>
              <span style={{ fontSize:14, color:'var(--warm-gray)' }}>{product.rating?.toFixed(1)} ({product.numReviews} reviews)</span>
            </div>

            <div style={{ display:'flex', alignItems:'baseline', gap:12, marginBottom:24 }}>
              <span style={{ fontFamily:'var(--ff-display)', fontSize:42, fontWeight:500, color:'var(--rose-dark)' }}>₹{product.price?.toLocaleString()}</span>
              {product.originalPrice && <>
                <span style={{ fontSize:18, color:'#bbb', textDecoration:'line-through' }}>₹{product.originalPrice?.toLocaleString()}</span>
                <span style={{ fontSize:13, fontWeight:600, color:'var(--sage)' }}>Save ₹{(product.originalPrice-product.price)?.toLocaleString()}</span>
              </>}
            </div>

            {/* Qty + Add */}
            <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:12 }}>
              <div style={{ display:'flex', alignItems:'center', border:'1.5px solid var(--border)', borderRadius:50 }}>
                <button onClick={() => setQty(q => Math.max(1,q-1))} style={{ width:36,height:42,background:'none',border:'none',cursor:'pointer',fontSize:16 }}>−</button>
                <span style={{ minWidth:32,textAlign:'center',fontWeight:600,fontSize:15 }}>{qty}</span>
                <button onClick={() => setQty(q => q+1)} style={{ width:36,height:42,background:'none',border:'none',cursor:'pointer',fontSize:16 }}>+</button>
              </div>
              <button onClick={() => { for(let i=0;i<qty;i++) dispatch(addLocal({...product,_id:product._id})); toast.success(`${product.name} added! 🌸`); }}
                className="btn-primary" style={{ flex:1, justifyContent:'center' }}>🛒 Add to Cart</button>
            </div>
            <button onClick={() => { dispatch(addLocal(product)); navigate('/checkout'); }} className="btn-outline" style={{ width:'100%', justifyContent:'center', marginBottom:20 }}>⚡ Buy Now</button>

            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
              {['🚚 Same-Day Delivery','📦 Eco Packaging','💚 100% Fresh','🎀 Free Giftwrap'].map(p => (
                <span key={p} style={{ padding:'5px 12px', borderRadius:50, fontSize:11, fontWeight:500, background:'var(--blush)', border:'1px solid var(--border)' }}>{p}</span>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ borderBottom:'1.5px solid var(--border)', marginBottom:16 }}>
              {['description','care','reviews'].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{ padding:'9px 18px', border:'none', background:'none', cursor:'pointer', fontWeight:500, fontSize:13,
                  color: tab===t ? 'var(--rose)' : 'var(--warm-gray)',
                  borderBottom: tab===t ? '2px solid var(--rose)' : '2px solid transparent', textTransform:'capitalize', transition:'all .18s' }}>{t}</button>
              ))}
            </div>
            {tab==='description' && <p style={{ color:'var(--warm-gray)', lineHeight:1.85, fontSize:14 }}>{product.description}</p>}
            {tab==='care' && (
              <div style={{ background:'var(--sage-light)', borderRadius:10, padding:16 }}>
                <div style={{ fontSize:18, marginBottom:6 }}>🌿 Care Instructions</div>
                <p style={{ color:'#3A6B3E', lineHeight:1.8, fontSize:14 }}>{product.care || 'Keep in fresh cool water, trim stems every 2 days.'}</p>
              </div>
            )}
            {tab==='reviews' && (
              <div>
                {product.reviews?.length === 0 && <p style={{ color:'var(--warm-gray)', fontSize:13 }}>No reviews yet. Be the first!</p>}
                {(product.reviews||[]).map(r => (
                  <div key={r._id} style={{ padding:'12px 0', borderBottom:'1px solid var(--border)' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                      <span style={{ fontWeight:600, fontSize:13 }}>{r.name}</span>
                      <span style={{ color:'var(--gold)', fontSize:12 }}>{'★'.repeat(r.rating)}</span>
                    </div>
                    <p style={{ fontSize:13, color:'var(--warm-gray)' }}>{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 style={{ fontFamily:'var(--ff-display)', fontSize:28, fontWeight:400, marginBottom:20 }}>You Might Also Love</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:16 }}>
              {related.map(p => {
                const e2 = EMOJIS[p.category]||'🌸';
                return (
                  <Link key={p._id} to={`/shop/${p._id}`} style={{ textDecoration:'none' }}>
                    <div className="card">
                      <div style={{ height:150,background:'linear-gradient(135deg,var(--blush),var(--rose-light))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:60 }}>{e2}</div>
                      <div style={{ padding:14 }}>
                        <h3 style={{ fontFamily:'var(--ff-display)', fontSize:16, fontWeight:500, color:'var(--charcoal)', marginBottom:4 }}>{p.name}</h3>
                        <div style={{ fontWeight:700, color:'var(--rose-dark)' }}>₹{p.price?.toLocaleString()}</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
