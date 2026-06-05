import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';

const TESTIMONIALS = [
  { name:'Priya Sharma', role:'Bride', text:'The wedding bouquet was breathtaking. Every petal was perfect!', rating:5, avatar:'PS' },
  { name:'Arjun Mehta',  role:'Regular Customer', text:"3 years ordering — quality never disappoints. Fast delivery, fresh blooms every time.", rating:5, avatar:'AM' },
  { name:'Divya Nair',   role:'Interior Designer', text:'Consistently delivers arrangements that are artistic masterpieces.', rating:5, avatar:'DN' },
  { name:'Rohan Kapoor', role:'Anniversary Gift', text:'Roses stayed fresh for 2 weeks! Incredible quality.', rating:5, avatar:'RK' },
];

export default function HomePage() {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector(s => s.products);
  const [email, setEmail] = useState('');

  useEffect(() => { dispatch(fetchProducts({ limit: 8 })); }, [dispatch]);

  const featured  = products.filter(p => p.badge === 'Bestseller' || p.isFeatured).slice(0, 4);
  const newArrivals = products.slice(4, 8);

  return (
    <div>
      {/* Hero */}
      <section style={{ minHeight:'100vh',paddingTop:'var(--nav-h)',background:'linear-gradient(135deg,var(--cream) 0%,var(--blush) 50%,#FAE8ED 100%)',display:'flex',alignItems:'center' }}>
        <div style={{ maxWidth:'var(--max-w)',margin:'0 auto',padding:'60px 24px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'center' }}>
          <div className="animate-fade-up">
            <div className="section-label">✦ Est. 2020 · Nagercoil, Kanyakumari</div>
            <h1 style={{ fontFamily:'var(--ff-display)',fontSize:'clamp(36px,5.5vw,68px)',fontWeight:300,lineHeight:1.1,marginBottom:18 }}>
              Where Every Bloom<br/><em style={{ color:'var(--rose)',fontWeight:400 }}>Tells a Story</em>
            </h1>
            <p style={{ fontSize:15,color:'var(--warm-gray)',lineHeight:1.8,marginBottom:28,maxWidth:430 }}>
              Handcrafted floral arrangements for life's most beautiful moments. From intimate bouquets to grand wedding installations.
            </p>
            <div style={{ display:'flex',gap:12,flexWrap:'wrap',marginBottom:36 }}>
              <Link to="/shop"  className="btn-primary" style={{ textDecoration:'none' }}>Shop Now 🌸</Link>
              <Link to="/about" className="btn-outline" style={{ textDecoration:'none' }}>Our Story</Link>
            </div>
            <div style={{ display:'flex',gap:28 }}>
              {[['10K+','Customers'],['500+','Weddings'],['2K+','Daily Blooms']].map(([n,l]) => (
                <div key={l}><div style={{ fontFamily:'var(--ff-display)',fontSize:26,fontWeight:500,color:'var(--rose-dark)' }}>{n}</div><div style={{ fontSize:12,color:'var(--warm-gray)' }}>{l}</div></div>
              ))}
            </div>
          </div>
          <div style={{ textAlign:'center',fontSize:130,lineHeight:1,filter:'drop-shadow(0 24px 48px rgba(200,85,106,.18))',animation:'float 4s ease-in-out infinite' }}>💐</div>
        </div>
      </section>

      {/* Why choose */}
      <section style={{ background:'#fff',borderBottom:'1px solid var(--border)',padding:'12px 0' }}>
        <div style={{ maxWidth:'var(--max-w)',margin:'0 auto',padding:'0 24px',display:'flex',justifyContent:'space-around',flexWrap:'wrap',gap:0 }}>
          {[['🚚','Same-Day Delivery'],['🌿','Farm Fresh'],['🎀','Free Giftwrap'],['💚','Eco Packaging'],['⭐','5-Star Rated']].map(([e,t]) => (
            <div key={t} style={{ display:'flex',alignItems:'center',gap:6,padding:'14px 8px',fontSize:13,fontWeight:500,color:'var(--warm-gray)' }}><span>{e}</span><span>{t}</span></div>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section style={{ maxWidth:'var(--max-w)',margin:'0 auto',padding:'72px 24px' }}>
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:32 }}>
          <div><div className="section-label">✦ Hand Picked</div><h2 className="section-title">Bestselling Arrangements</h2></div>
          <Link to="/shop" className="btn-outline" style={{ textDecoration:'none',padding:'8px 18px' }}>View All →</Link>
        </div>
        {loading ? <div className="spinner"/> : (
          <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:20 }}>
            {(featured.length ? featured : products.slice(0,4)).map(p => <ProductCard key={p._id} product={p}/>)}
          </div>
        )}
      </section>

      {/* Dark banner */}
      <section style={{ background:'linear-gradient(135deg,#2C1A1E,#4A1B28)',padding:'64px 24px' }}>
        <div style={{ maxWidth:'var(--max-w)',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr auto',gap:32,alignItems:'center' }}>
          <div>
            <div style={{ fontSize:11,letterSpacing:3,color:'var(--gold)',fontWeight:500,textTransform:'uppercase',marginBottom:10 }}>✦ Seasonal Special</div>
            <h2 style={{ fontFamily:'var(--ff-display)',fontSize:'clamp(28px,4vw,48px)',fontWeight:400,color:'#fff',lineHeight:1.15,marginBottom:16 }}>Summer Wedding<br/><em>Collection 2025</em></h2>
            <p style={{ color:'rgba(255,255,255,.65)',fontSize:14,lineHeight:1.8,marginBottom:24 }}>20% off luxury bridal packages. Only 12 dates remaining.</p>
            <Link to="/collection" className="btn-primary" style={{ textDecoration:'none' }}>Explore Wedding Flowers</Link>
          </div>
          <div style={{ fontSize:80 }}>👰</div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section style={{ background:'var(--blush)',padding:'72px 24px' }}>
          <div style={{ maxWidth:'var(--max-w)',margin:'0 auto' }}>
            <div style={{ display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:32 }}>
              <div><div className="section-label">✦ Fresh In</div><h2 className="section-title">New Arrivals</h2></div>
              <Link to="/shop" className="btn-outline" style={{ textDecoration:'none',padding:'8px 18px' }}>Shop All →</Link>
            </div>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:20 }}>
              {newArrivals.map(p => <ProductCard key={p._id} product={p}/>)}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section style={{ maxWidth:'var(--max-w)',margin:'0 auto',padding:'72px 24px' }}>
        <div style={{ textAlign:'center',marginBottom:40 }}><div className="section-label">✦ Customer Love</div><h2 className="section-title" style={{ textAlign:'center' }}>What Our Customers Say</h2></div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:20 }}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="card" style={{ padding:24 }}>
              <div className="stars" style={{ fontSize:14,marginBottom:12 }}>{'★'.repeat(t.rating)}</div>
              <p style={{ fontSize:14,color:'var(--charcoal)',lineHeight:1.75,fontStyle:'italic',marginBottom:14 }}>"{t.text}"</p>
              <div style={{ display:'flex',alignItems:'center',gap:10,borderTop:'1px solid var(--border)',paddingTop:12 }}>
                <div style={{ width:34,height:34,borderRadius:'50%',background:'var(--rose)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:12 }}>{t.avatar}</div>
                <div><div style={{ fontWeight:600,fontSize:13 }}>{t.name}</div><div style={{ fontSize:11,color:'var(--warm-gray)' }}>{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ background:'var(--rose)',padding:'52px 24px' }}>
        <div style={{ maxWidth:520,margin:'0 auto',textAlign:'center' }}>
          <h2 style={{ fontFamily:'var(--ff-display)',fontSize:32,fontWeight:400,color:'#fff',marginBottom:10 }}>Get Bloom Updates</h2>
          <p style={{ color:'rgba(255,255,255,.85)',marginBottom:22,fontSize:14 }}>Subscribe for seasonal offers, care tips, and first access to new arrivals.</p>
          <div style={{ display:'flex',background:'#fff',borderRadius:50,overflow:'hidden',boxShadow:'0 4px 20px rgba(0,0,0,.15)' }}>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" style={{ flex:1,padding:'12px 18px',border:'none',outline:'none',fontSize:13 }}/>
            <button onClick={() => { if(email){ alert('Subscribed! 🌸'); setEmail(''); }}} style={{ padding:'12px 20px',background:'var(--rose-dark)',color:'#fff',border:'none',borderRadius:'0 50px 50px 0',fontWeight:600,fontSize:13,cursor:'pointer',whiteSpace:'nowrap' }}>Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
