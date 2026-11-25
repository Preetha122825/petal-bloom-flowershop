import React from 'react';
import { Link } from 'react-router-dom';

const TEAM = [
  { name:'Meera Krishnan', role:'Head Florist & Founder', emoji:'👩‍🌾', bio:'20 years crafting botanical beauty. Trained in Paris under Marie Dubois and Tokyo under Hanae Mori.' },
  { name:'Sunita Reddy',   role:'Wedding Specialist',     emoji:'👰',    bio:'Transforms venues with floral artistry. 500+ weddings perfected across Tamil Nadu.' },
  { name:'Aryan Bose',     role:'Floral Designer',        emoji:'🎨',    bio:'Modern arrangements with classical roots. Studied at the Royal Horticultural Society, London.' },
  { name:'Pooja Thomas',   role:'Customer Care Lead',     emoji:'💝',    bio:'Ensures every bloom reaches you in perfect condition. Your happiness is her mission.' },
];

const WHY = [
  { icon:'🌿', title:'Farm Fresh Daily',     desc:'Direct from certified farms. Every flower arrives within 24 hours of harvest — never sitting in cold storage.' },
  { icon:'🚚', title:'Same-Day Delivery',    desc:'Order by 2 PM for same-day delivery across Chennai. Live tracking included with every order.' },
  { icon:'🎨', title:'Custom Arrangements', desc:'Our florists craft bespoke arrangements tailored to your vision, occasion, and budget.' },
  { icon:'💚', title:'Eco-Conscious',       desc:'Sustainable packaging, locally sourced flowers where possible, and a zero-single-use-plastic policy.' },
];

export default function AboutPage() {
  return (
    <div style={{ paddingTop:'var(--nav-h)' }}>

      {/* Hero */}
      <section style={{ background:'linear-gradient(135deg,var(--cream) 0%,var(--blush) 100%)', padding:'72px 24px', textAlign:'center' }}>
        <div className="section-label">✦ Our Story</div>
        <h1 className="section-title" style={{ textAlign:'center' }}>
          Grown With Love<br/><em style={{ color:'var(--rose)', fontWeight:400 }}>Since 2018</em>
        </h1>
        <p style={{ fontSize:16, color:'var(--warm-gray)', lineHeight:1.8, maxWidth:560, margin:'16px auto 0' }}>
          What started as a small stall in Pallavaram Flower Market has blossomed into Chennai's most beloved boutique flower shop.
        </p>
      </section>

      {/* Story */}
      <section style={{ maxWidth:'var(--max-w)', margin:'0 auto', padding:'72px 24px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'center' }}>
        <div style={{ fontSize:72, textAlign:'center', background:'var(--blush)', borderRadius:24, padding:40, lineHeight:1.5 }}>
          🌹🌷🌸<br/>💐🌺🌻<br/>🌿🪻🌼
        </div>
        <div>
          <div className="section-label">✦ Our Founding</div>
          <h2 className="section-title" style={{ fontSize:36, marginBottom:20 }}>A Love Letter to Flowers</h2>
          <p style={{ color:'var(--warm-gray)', lineHeight:1.85, marginBottom:16, fontSize:15 }}>
            Meera Krishnan's journey began at age 8, collecting wildflowers from her grandmother's garden in Coimbatore. 
            After training in Paris under renowned florist Marie Dubois, she returned to Chennai with a single vision — to 
            bring European floral artistry to Indian celebrations.
          </p>
          <p style={{ color:'var(--warm-gray)', lineHeight:1.85, fontSize:15 }}>
            Today, Petal & Bloom serves over 10,000 happy customers and has graced 500+ weddings across Tamil Nadu and beyond. 
            Every arrangement is still hand-crafted with the same love Meera put into her very first bouquet.
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section style={{ background:'var(--charcoal)', padding:'72px 24px' }}>
        <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
          {[
            { icon:'🎯', label:'Mission', title:'Making Moments Bloom', text:'To make extraordinary floral experiences accessible to everyone — from a single stem to a grand wedding installation. We believe flowers should be part of everyday joy, not just special occasions.' },
            { icon:'🔭', label:'Vision',  title:'A Greener Tomorrow',   text:'To lead India\'s floral industry toward sustainable practices — sourcing locally, composting waste, and educating customers on flower care so every bloom lives its fullest life.' },
          ].map(({ icon, label, title, text }) => (
            <div key={label} style={{ background:'rgba(255,255,255,.05)', borderRadius:20, padding:40, border:'1px solid rgba(255,255,255,.1)' }}>
              <div style={{ fontSize:44, marginBottom:14 }}>{icon}</div>
              <div style={{ fontSize:10, letterSpacing:3, color:'var(--rose)', fontWeight:500, textTransform:'uppercase', marginBottom:8 }}>{label}</div>
              <h3 style={{ fontFamily:'var(--ff-display)', fontSize:26, fontWeight:400, color:'#fff', marginBottom:14 }}>{title}</h3>
              <p style={{ color:'rgba(255,255,255,.62)', lineHeight:1.85, fontSize:14 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ maxWidth:'var(--max-w)', margin:'0 auto', padding:'72px 24px' }}>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <div className="section-label">✦ Why Petal & Bloom</div>
          <h2 className="section-title" style={{ textAlign:'center' }}>The Difference You'll Feel</h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:24 }}>
          {WHY.map(({ icon, title, desc }) => (
            <div key={title} className="card" style={{ padding:28, textAlign:'center', background:'var(--blush)', boxShadow:'none', border:'1px solid var(--border)' }}>
              <div style={{ fontSize:44, marginBottom:16 }}>{icon}</div>
              <h3 style={{ fontFamily:'var(--ff-display)', fontSize:20, fontWeight:500, marginBottom:10 }}>{title}</h3>
              <p style={{ fontSize:13, color:'var(--warm-gray)', lineHeight:1.75 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ background:'var(--blush)', padding:'72px 24px' }}>
        <div style={{ maxWidth:'var(--max-w)', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div className="section-label">✦ Meet the Team</div>
            <h2 className="section-title" style={{ textAlign:'center' }}>The Hands Behind Every Bloom</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:24 }}>
            {TEAM.map(m => (
              <div key={m.name} className="card" style={{ padding:28, textAlign:'center' }}>
                <div style={{ fontSize:56, marginBottom:14 }}>{m.emoji}</div>
                <h3 style={{ fontFamily:'var(--ff-display)', fontSize:20, fontWeight:500, marginBottom:4 }}>{m.name}</h3>
                <div style={{ fontSize:11, color:'var(--rose)', fontWeight:600, letterSpacing:.8, textTransform:'uppercase', marginBottom:12 }}>{m.role}</div>
                <p style={{ fontSize:13, color:'var(--warm-gray)', lineHeight:1.75 }}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background:'var(--rose-light)', padding:'56px 24px' }}>
        <div style={{ maxWidth:'var(--max-w)', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24, textAlign:'center' }}>
          {[['10K+','Customers Served'],['500+','Weddings'],['50K+','Monthly Blooms'],['6','Industry Awards']].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontFamily:'var(--ff-display)', fontSize:48, fontWeight:400, color:'var(--rose-dark)' }}>{n}</div>
              <div style={{ fontSize:13, color:'var(--warm-gray)', marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth:'var(--max-w)', margin:'0 auto', padding:'72px 24px', textAlign:'center' }}>
        <div className="section-label">✦ Ready to Bloom?</div>
        <h2 className="section-title" style={{ textAlign:'center', marginBottom:20 }}>Start Your Floral Journey</h2>
        <p style={{ color:'var(--warm-gray)', fontSize:15, marginBottom:28 }}>Browse our collection or get in touch for a custom arrangement.</p>
        <div style={{ display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap' }}>
          <Link to="/shop"    className="btn-primary" style={{ textDecoration:'none' }}>Shop Flowers 🌸</Link>
          <Link to="/contact" className="btn-outline" style={{ textDecoration:'none' }}>Contact Us</Link>
        </div>
      </section>
    </div>
  );
}
