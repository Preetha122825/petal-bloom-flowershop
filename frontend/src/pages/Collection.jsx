import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/productSlice';

const CATEGORIES = [
  { name:'Roses',         emoji:'🌹', desc:'Timeless romance in every petal. From classic red to blush pink.',      color:'#FEF3F5', count:4 },
  { name:'Lilies',        emoji:'🌷', desc:'Elegant and fragrant. Symbol of purity and refined beauty.',             color:'#F0F8F0', count:2 },
  { name:'Tulips',        emoji:'🌺', desc:"Spring's most cheerful messenger. Vibrant, lasting, joyful.",            color:'#FEFBF0', count:3 },
  { name:'Bouquets',      emoji:'💐', desc:'Curated mixed arrangements for every mood and occasion.',                color:'#EDE8F9', count:5 },
  { name:'Wedding',       emoji:'👰', desc:'For your most special day. Bespoke bridal and ceremony florals.',        color:'var(--blush)', count:3 },
  { name:'Indoor Plants', emoji:'🌿', desc:'Bring nature indoors. Low-maintenance beauties for home and office.',    color:'#EFF7EE', count:3 },
];

const FEATURED = [
  { name:'Crimson Rose Bouquet', cat:'Roses',    emoji:'🌹', price:4249, badge:'Bestseller', desc:'12 fresh crimson roses with eucalyptus.' },
  { name:'Wedding Premium',      cat:'Wedding',  emoji:'👰', price:12749,badge:'Premium',    desc:'Luxury bridal bouquet — custom crafted.' },
  { name:'Sunflower Sunshine',   cat:'Bouquets', emoji:'🌻', price:3144, badge:'Popular',    desc:'Giant sunflowers that brighten any room.' },
];

export default function CollectionPage() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const goToShop = (cat) => {
    dispatch(setFilters({ category: cat, page: 1 }));
    navigate('/shop');
  };

  return (
    <div style={{ paddingTop:'var(--nav-h)' }}>

      {/* Hero */}
      <section style={{ background:'linear-gradient(135deg,var(--cream),var(--blush))', padding:'56px 24px 40px', textAlign:'center' }}>
        <div className="section-label">✦ Browse by Category</div>
        <h1 className="section-title" style={{ textAlign:'center' }}>Our Floral Collections</h1>
        <p style={{ color:'var(--warm-gray)', fontSize:15, maxWidth:500, margin:'14px auto 0' }}>
          From single stems to grand installations — find the perfect bloom for every moment.
        </p>
      </section>

      {/* Category Grid */}
      <section style={{ maxWidth:'var(--max-w)', margin:'0 auto', padding:'56px 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:24 }}>
          {CATEGORIES.map(c => (
            <div key={c.name} className="card" onClick={() => goToShop(c.name)}
              style={{ cursor:'pointer', overflow:'hidden' }}>
              <div style={{ height:190, background:c.color, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontSize:64, position:'relative', transition:'font-size .25s' }}
                onMouseEnter={e => e.currentTarget.style.fontSize='78px'}
                onMouseLeave={e => e.currentTarget.style.fontSize='64px'}>
                {c.emoji}
                <div style={{ position:'absolute', bottom:12, right:12, background:'rgba(255,255,255,.9)', borderRadius:50, padding:'3px 10px', fontSize:11, fontWeight:600, color:'var(--warm-gray)' }}>
                  {c.count}+ items
                </div>
              </div>
              <div style={{ padding:'18px 22px' }}>
                <h3 style={{ fontFamily:'var(--ff-display)', fontSize:22, fontWeight:500, marginBottom:6 }}>{c.name}</h3>
                <p style={{ fontSize:13, color:'var(--warm-gray)', marginBottom:10, lineHeight:1.6 }}>{c.desc}</p>
                <span style={{ color:'var(--rose)', fontWeight:600, fontSize:13 }}>Browse {c.name} →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Picks */}
      <section style={{ background:'var(--blush)', padding:'56px 24px' }}>
        <div style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:32 }}>
            <div>
              <div className="section-label">✦ Editor's Choice</div>
              <h2 className="section-title">Featured Arrangements</h2>
            </div>
            <Link to="/shop" className="btn-outline" style={{ textDecoration:'none', padding:'8px 18px' }}>View All →</Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:24 }}>
            {FEATURED.map(p => (
              <div key={p.name} className="card" style={{ padding:0, overflow:'hidden' }}>
                <div style={{ height:180, background:'linear-gradient(135deg,var(--blush),var(--rose-light))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:80, position:'relative' }}>
                  {p.emoji}
                  <div style={{ position:'absolute', top:12, left:12, padding:'3px 10px', borderRadius:50, fontSize:10, fontWeight:700, background:'var(--rose)', color:'#fff' }}>{p.badge}</div>
                </div>
                <div style={{ padding:20 }}>
                  <div style={{ fontSize:10, color:'var(--warm-gray)', letterSpacing:.8, textTransform:'uppercase', marginBottom:4 }}>{p.cat}</div>
                  <h3 style={{ fontFamily:'var(--ff-display)', fontSize:20, fontWeight:500, marginBottom:6 }}>{p.name}</h3>
                  <p style={{ fontSize:13, color:'var(--warm-gray)', marginBottom:14, lineHeight:1.6 }}>{p.desc}</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ fontSize:20, fontWeight:700, color:'var(--rose-dark)' }}>₹{p.price.toLocaleString()}</span>
                    <Link to="/shop" className="btn-primary" style={{ textDecoration:'none', padding:'8px 16px', fontSize:13 }}>Shop Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Banner */}
      <section style={{ background:'linear-gradient(135deg,#2C1A1E,#4A1B28)', padding:'64px 24px' }}>
        <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr auto', gap:40, alignItems:'center' }}>
          <div>
            <div style={{ fontSize:11, letterSpacing:3, color:'var(--gold)', fontWeight:500, textTransform:'uppercase', marginBottom:10 }}>✦ Bridal Collections</div>
            <h2 style={{ fontFamily:'var(--ff-display)', fontSize:'clamp(28px,4vw,48px)', fontWeight:400, color:'#fff', lineHeight:1.15, marginBottom:16 }}>
              Your Wedding,<br/><em>Perfectly Bloomed</em>
            </h2>
            <p style={{ color:'rgba(255,255,255,.65)', fontSize:14, lineHeight:1.85, marginBottom:28, maxWidth:440 }}>
              From intimate garden weddings to grand ballroom celebrations — our bridal team crafts arrangements that make every moment unforgettable. Book a free consultation today.
            </p>
            <div style={{ display:'flex', gap:12 }}>
              <button onClick={() => goToShop('Wedding')} className="btn-primary">Explore Wedding</button>
              <Link to="/contact" className="btn-outline" style={{ textDecoration:'none', borderColor:'rgba(255,255,255,.4)', color:'rgba(255,255,255,.8)' }}>Book Consultation</Link>
            </div>
          </div>
          <div style={{ fontSize:90, filter:'drop-shadow(0 16px 32px rgba(200,85,106,.3))' }}>💒</div>
        </div>
      </section>

      {/* Custom Orders CTA */}
      <section style={{ maxWidth:'var(--max-w)', margin:'0 auto', padding:'56px 24px' }}>
        <div style={{ background:'var(--blush)', borderRadius:24, padding:'44px 40px', display:'grid', gridTemplateColumns:'1fr auto', gap:32, alignItems:'center' }}>
          <div>
            <div className="section-label">✦ Bespoke Floristry</div>
            <h2 style={{ fontFamily:'var(--ff-display)', fontSize:32, fontWeight:400, marginBottom:12 }}>Something Special in Mind?</h2>
            <p style={{ color:'var(--warm-gray)', fontSize:14, lineHeight:1.75, maxWidth:480 }}>
              Our florists create one-of-a-kind arrangements for any occasion. Share your vision and we'll bring it to life — from colour palette to final bloom.
            </p>
          </div>
          <Link to="/contact" className="btn-primary" style={{ textDecoration:'none', whiteSpace:'nowrap' }}>Get in Touch 🌸</Link>
        </div>
      </section>
    </div>
  );
}
